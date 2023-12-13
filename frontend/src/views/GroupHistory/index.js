import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { CustomBreadcrumbs } from "../../utils/Breadcrums";
import axios from "axios";

const GroupHistory = () => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groupHistory, setGroupHistory] = useState([]);
  const [groupData, setGroupData] = useState(null);

  const userId = sessionStorage.getItem("userId");

  const fetchGroupHistory = async (selectedGroup) => {
    try {
      const response = await axios.get(
        `/getGroupTransactions/${selectedGroup}`
      );
      setGroupHistory(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    selectedGroup && fetchGroupHistory(selectedGroup);
  }, [selectedGroup]);

  const handleGroupSelect = (event) => {
    setSelectedGroup(event.target.value);
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`/getGroups/${userId}`);
      setGroupData(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <>
      <CustomBreadcrumbs
        pages={[
          { text: "Home", link: "/homepage" },
          { text: "Group - Home", link: "/groupexpensehomepage" },
          { text: "History", link: "/groupHistory" },
        ]}
      />
      <div style={{ maxWidth: "75%", margin: "0 auto", paddingBottom: "30px" }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ paddingTop: 2 }}
          gutterBottom
        >
          My Group History
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Select Group</InputLabel>
              <Select
                value={selectedGroup}
                onChange={handleGroupSelect}
                label="Select Group"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {groupData &&
                  groupData.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {groupHistory.length === 0 ? (
              <Card variant="outlined" sx={{ padding: 2 }}>
                <CardContent>
                  <Typography variant="body1" align="center">
                    No history found for this group.
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <Grid container spacing={2}>
                {groupHistory &&
                  groupHistory.map((entry) => (
                    <Grid item key={entry.id} xs={12} sm={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Grid container alignItems="center">
                            <Grid item xs={12} md={6}>
                              <Typography variant="body1">
                                <strong>Date:</strong>{" "}
                                {new Date(entry.timestamp).toLocaleString()}
                              </Typography>
                              <Typography variant="body1">
                                <strong>Paid by:</strong> {entry.paidBy}
                              </Typography>
                              <Typography variant="body1">
                                <strong>Description:</strong>{" "}
                                {entry.description}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography variant="body1">
                                <strong>Total Amount:</strong>{" "}
                                {entry.memberDivision.reduce(
                                  (acc, val) => acc + val,
                                  0
                                )}
                              </Typography>
                              {groupData &&
                                groupData
                                  .find((group) => group.id === selectedGroup)
                                  .members.map((member, index) => (
                                    <div key={index}>
                                      <Typography variant="body2">
                                        {member} -{" "}
                                        {(
                                          (entry.memberDivision[index] /
                                            entry.memberDivision.reduce(
                                              (acc, val) => acc + val,
                                              0
                                            )) *
                                          100
                                        ).toFixed(2)}
                                        %
                                      </Typography>
                                      <LinearProgress
                                        variant="determinate"
                                        value={
                                          (entry.memberDivision[index] /
                                            entry.memberDivision.reduce(
                                              (acc, val) => acc + val,
                                              0
                                            )) *
                                          100
                                        }
                                        sx={{ height: 8, borderRadius: 5 }}
                                      />
                                    </div>
                                  ))}
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default GroupHistory;
