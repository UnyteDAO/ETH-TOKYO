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
} from "@mui/material";

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
