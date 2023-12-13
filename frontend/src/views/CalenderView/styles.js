import styled from '@emotion/styled';
import { Dialog } from '@mui/material';

export const CalendarContainer = styled.div`
	height: 100vh;
	background-color: #f8f9fa;
	border-radius: 10px;
	padding: 20px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledDialog = styled(Dialog)`
	.MuiDialogTitle-root {
		background-color: #007bff;
		color: white;
		padding: 20px;
	}

	.MuiDialogContent-root {
		padding: 0;
	}

	.MuiDialog-paper {
		width: 60%;
		max-width: 100%;
	}

	.ExpensePage,
	.IncomePage,
	.GroupExpensePage {
		width: auto !important;
	}
`;
