import React from "react";
import styled from "@emotion/styled";
import {
  Button,
  TextField,
  Box,
  Container,
  CardContent,
  CardActions,
  Card,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

export const HeaderW = styled(Box)`
  width: 15vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: static;
  border-right: 1px solid white;
`;
export const DaoWorkerWrapper = styled(Box)`
  width: 85vw;
  min-height: 100vh;
  padding-top: 10vh;
`;
export const DaoWorkerTabWrapper = styled(Box)`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;
export const DaoWorkerTab = styled(Box)`
  width: 30%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const ReviewerInput = styled(TextField)`
  width: 100%;
`;

export const Grid2With960W = styled(Grid2)`
  max-width: 960px;
  display: flex;
  justify-content: center;
`;

export const Grid2With960W2 = styled(Grid2)`
  max-width: 960px;
  display: flex;
`;

export const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;

export const ListWrapper = styled(Box)`
  width: 100vw;
  min-height: 100vh;
  padding-top: 40vh;
  display: flex;
  justify-content: center;
`;

export const ListWrapperNoP = styled(Box)`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

export const CenterWrapperNoP = styled(Box)`
  width: 85vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ListContent = styled(Box)`
  width: 960px;
  display: flex;
  flex-direction: column;
`;

export const Ucol = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const Urow = styled(Box)`
  display: flex;
`;

export const AuthWrapper = styled(Box)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AuthCard = styled(Card)`
  padding: 16px;
  min-width: 380px;
`;

export const AuthCardContent = styled(CardContent)``;

export const AuthCardActions = styled(CardActions)`
  display: flex;
  justify-content: center;
`;

export const TextForm = styled(TextField)`
  background-color: white;
`;
