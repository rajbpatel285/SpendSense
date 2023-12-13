import React from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQsPage = () => {
  const faqs = [
    {
      category: "Personal Expenses",
      questions: [
        {
          question: "How do I add a personal expense?",
          answer:
            'To add a personal expense, go to the Expenses page and click on the "Add Expense" button. Fill in the necessary details and click "Save".',
        },
        {
          question: "Can I edit or delete a personal expense?",
          answer:
            "Yes, you can edit or delete a personal expense. Go to the Expenses page, find the expense you want to edit or delete, and click on the respective action buttons.",
        },
        {
          question: "How can I categorize my personal expenses?",
          answer:
            "You can categorize your personal expenses by assigning them specific categories such as groceries, transportation, entertainment, etc. This helps in organizing and tracking your expenses.",
        },
        {
          question: "Is it possible to set a budget for my personal expenses?",
          answer:
            'Yes, you can set a budget for your personal expenses. Navigate to the Budgets page and click on the "Add Budget" button. Specify the budget amount and the duration.',
        },
        {
          question: "Can I generate expense reports for my personal expenses?",
          answer:
            "Absolutely! You can generate detailed reports for your personal expenses by going to the Reports page. Choose the desired date range and the report will be generated for you.",
        },
      ],
    },
    {
      category: "Shared Expenses",
      questions: [
        {
          question: "How do I create a shared expense group?",
          answer:
            'To create a shared expense group, navigate to the Groups page and click on the "Create Group" button. Follow the instructions to set up the group.',
        },
        {
          question: "How can I invite members to a shared expense group?",
          answer:
            'To invite members to a shared expense group, go to the Groups page, select the group, and click on the "Invite Members" button. Enter their email addresses and send the invitations.',
        },
        {
          question: "What happens if a member leaves a shared expense group?",
          answer:
            "When a member leaves a shared expense group, their expenses and contributions remain intact. However, they will no longer have access to the group and its shared expenses.",
        },
        {
          question: "Can I split expenses unequally in a shared expense group?",
          answer:
            "Yes, you can split expenses unequally in a shared expense group. During expense creation, specify the amounts owed by each member, and the system will handle the calculations accordingly.",
        },
        {
          question:
            "Is it possible to view a summary of shared expenses for each group?",
          answer:
            "Absolutely! On the Groups page, select a group, and you will see a summary of shared expenses, including the total amount spent, pending amounts, and individual contributions.",
        },
      ],
    },
    {
      category: "Data Security",
      questions: [
        {
          question: "How is my personal and financial data secured?",
          answer:
            "We take data security seriously. All your personal and financial data is encrypted and stored securely. We adhere to strict privacy policies and employ industry-standard security measures to protect your information.",
        },
        {
          question: "Is my data backed up regularly?",
          answer:
            "Yes, we regularly back up your data to ensure its safety and availability. In the unlikely event of any data loss, we can restore your information from the latest backup.",
        },
        {
          question: "Who has access to my personal and financial data?",
          answer:
            "Your personal and financial data is strictly confidential. Only you and authorized personnel have access to your data. We do not share your information with any third parties without your consent.",
        },
      ],
    },
    {
      category: "Reports",
      questions: [
        {
          question: "How can I generate a monthly expense report?",
          answer:
            "To generate a monthly expense report, go to the Reports page and select the desired month. The system will generate a detailed report summarizing your expenses for that month.",
        },
        {
          question:
            "Can I export the expense reports to a PDF or Excel format?",
          answer:
            "Yes, you can export the expense reports to different formats such as PDF or Excel. On the Reports page, you will find options to export the reports in various file formats.",
        },
        {
          question:
            "Is it possible to filter the expense reports by specific categories or time periods?",
          answer:
            "Absolutely! The reports page allows you to apply filters to the expense reports. You can filter the reports by specific categories, time periods, or any other relevant criteria.",
        },
      ],
    },
  ];

  return (
    <Container maxWidth="md" style={{ paddingBottom: "3%" }}>
      <Typography variant="h4" align="left" sx={{ mt: 4, mb: 2 }}>
        Frequently Asked Questions
      </Typography>
      <Typography variant="body1" align="left" sx={{ mt: 6, mb: 4 }}>
        You can find FAQs related to each category below. Click on each to view
        more.
      </Typography>
      {faqs.map((category, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{ backgroundColor: "#eeeeee" }}
          >
            <Typography>{category.category.toUpperCase()}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ paddingTop: "2%" }}>
              {category.questions.map((faq, index) => (
                <div key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {faq.question}
                  </Typography>
                  <Typography variant="body1" style={{ paddingBottom: "2%" }}>
                    {faq.answer}
                  </Typography>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default FAQsPage;
