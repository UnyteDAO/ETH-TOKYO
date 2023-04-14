import React, { useCallback, useState, FC, useEffect } from "react";
import { theme } from "./CreateTheme";
import { ThemeProvider } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Avatar,
  Modal,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccountCircle } from "@mui/icons-material";
import { Wrapper, AllWrapper, UAppBar, Flex } from "./StyledComps";

import path from "path";
import dotenv from "dotenv";

import dummy from "./assets/iconwhite.webp";

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

import { ethers } from "ethers";
// ABIのインポート
import abi from "./contracts/Unyte.json";
// Astar
const CONTRACT_ADDRESS = "0xd08C0A04c755e2Ab46DE19302b340F8b58C36e28";
// ABIの参照
const ContractABI = abi.abi;
const privateKey: any = process.env.REACT_APP_PRIVATE_KEY;

interface CardData {
  id: number;
  username: string;
  content: string;
}

const sampleTasks: any[] = [
  {
    taskId: 1,
    teamId: 1,
    username: "Uwaizumi.eth",
    content: "将です",
    avatarURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
  },
  {
    taskId: 2,
    teamId: 1,
    username: "Uwaizumi.eth",
    content: "タスクです",
    avatarURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
  },
  {
    taskId: 3,
    teamId: 2,
    username: "Uwaizumi.eth",
    content: "たすくです",
    avatarURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
  },
  {
    taskId: 4,
    teamId: 3,
    username: "Uwaizumi.eth",
    content: "たすくです",
    avatarURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
  },
];
const sampleThanks: any[] = [
  {
    content: "ありがとう！",
    fromIconURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
    fromName: "Uwaizumi.eth",
    toIconURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
    toName: "yoshito",
  },
  {
    content: "おそくまでありがとう！",
    fromIconURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
    fromName: "Uwaizumi.eth",
    toIconURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
    toName: "yoshito",
  },
  {
    content: "タスク整理ありがとう！",
    fromIconURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
    fromName: "Uwaizumi.eth",
    toIconURL:
      "https://cdn.discordapp.com/guilds/945194711973498920/users/710388387726753852/avatars/a_b6744366c5a8b502ca2418bf9e162a10.webp?size=160",
    toName: "yoshito",
  },
];

const NeumorphicCardWrapper = styled(Card)(({ theme }) => ({
  borderRadius: "1rem",
  backgroundColor: "#E5EEF0",
  boxShadow: "10px 10px 10px #d9d9d9, -10px -10px 10px #ffffff",
  textDecoration: "none",
  minWidth: 275,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  width: "80%",
}));

const NeumorphicCard: React.FC<any> = ({
  id,
  content,
  userName,
  userIconURL,
  teamIconURL,
  teamName,
  handleOpen,
}) => {
  return (
    <NeumorphicCardWrapper onClick={() => handleOpen(id)}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={1}>
          <Avatar alt="Profile Picture" src={teamIconURL}></Avatar>
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            {teamName}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <p>created by: </p>
          <Avatar alt="Profile Picture" src={userIconURL}></Avatar>
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            {userName}
          </Typography>
        </Box>
      </CardContent>
    </NeumorphicCardWrapper>
  );
};

const ThanksCard: React.FC<any> = ({
  content,
  fromIconURL,
  fromUsername,
  toIconURL,
  toUsername,
}) => {
  return (
    <NeumorphicCardWrapper>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <p>from: </p>
          <Avatar alt="Profile Picture" src={fromIconURL}></Avatar>
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            {fromUsername}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb={1}>
          <p>to: </p>
          <Avatar alt="Profile Picture" src={toIconURL}></Avatar>
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            {toUsername}
          </Typography>
        </Box>
      </CardContent>
    </NeumorphicCardWrapper>
  );
};

const App: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null | any>(null);
  const [date, setDate] = React.useState<string | null>("ALL");
  const [months, setMonths] = useState(["ALL"]);
  const [onchainTasks, setOnchainTasks] = useState([]);
  const [onchainThanks, setOnchainThanks] = useState([]);

  // useEffect(() => {
  //   let tmp: any = [];
  //   const getUniqueValues = (array: any, key: any) => {
  //     const uniqueValues = new Set(array.map((item: any) => item[key]));
  //     return Array.from(uniqueValues);
  //   };
  //   // TODO
  //   const uniqueNames = getUniqueValues(onchainTasks, "teamId");
  //   tmp = uniqueNames;
  //   tmp.unshift("ALL");
  //   setMonths(tmp);
  // }, []);

  useEffect(() => {
    (async () => {
      const provider: any = new ethers.providers.JsonRpcProvider(
        "https://astar.blastapi.io/72fc6242-60a0-4d5c-b03d-5800687511c1"
      );
      const walletWithProvider = new ethers.Wallet(privateKey, provider);
      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ContractABI,
        walletWithProvider
      );
      const tasks = await connectedContract.getAllTasks();
      const thanks = await connectedContract.getAllThanks();
      setOnchainTasks(tasks);
      setOnchainThanks(thanks);
      console.dir(thanks);
      let tmp: any = [];
      const getUniqueValues = (array: any, key: any) => {
        const uniqueValues = new Set(array.map((item: any) => item[key]));
        return Array.from(uniqueValues);
      };
      const uniqueNames = getUniqueValues(onchainTasks, "teamId");
      tmp = uniqueNames;
      tmp.unshift("ALL");
      setMonths(tmp);
    })();
  }, []);

  const handleOpen = (id: string | number) => {
    setSelectedCard(
      onchainTasks.find((task: any) => task.taskId === id) || null
    );
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const tasksToRender =
    date === "ALL"
      ? onchainTasks
      : onchainTasks.filter((item: any) => item.teamId === date);

  const thanksToRender = modalOpen
    ? onchainThanks.filter((item: any) => item.taskId === selectedCard.taskId)
    : [];

  return (
    <AllWrapper>
      <UAppBar>
        <img src={dummy} style={{ height: 60 }}></img>
      </UAppBar>
      <Wrapper>
        <Flex>
          <p>チーム選択</p>
          <Box sx={{ marginRight: "16px" }}></Box>
          <Select
            labelId="periodLabel"
            id="periodLabel"
            value={date}
            label="Period"
            onChange={(e: any) => setDate(e.target.value as string)}
          >
            {months.map((item, i) => (
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Flex>
        <Box sx={{ marginTop: "16px" }}></Box>
        <Flex>
          <Button>Tasks/Thanks</Button>
          <Box sx={{ marginRight: "16px" }}></Box>
          <Button>Dashboard</Button>
        </Flex>
        {tasksToRender.map(
          ({
            taskId,
            content,
            teamName,
            teamIconURL,
            userIconURL,
            userName,
          }) => (
            <NeumorphicCard
              key={taskId}
              id={taskId}
              content={content}
              teamIconURL={teamIconURL}
              teamName={teamName}
              userName={userName}
              userIconURL={userIconURL}
              handleOpen={handleOpen}
            />
          )
        )}
      </Wrapper>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {selectedCard ? (
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              maxWidth: "900px",
              bgcolor: "#E5EEF0",
              boxShadow: 24,
              p: 4,
              maxHeight: "60vh",
              overflow: "scroll",
              border: "none",
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              {selectedCard.content}
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
              {selectedCard.username}
            </Typography>
            {sampleThanks.map(
              (
                { content, fromIconURL, fromName, toIconURL, toName },
                index
              ) => (
                <ThanksCard
                  key={index}
                  content={content}
                  fromIconURL={fromIconURL}
                  fromUsername={fromName}
                  toIconURL={toIconURL}
                  toUsername={toName}
                />
              )
            )}
          </Paper>
        ) : (
          <Paper></Paper>
        )}
      </Modal>
    </AllWrapper>
  );
};

export default App;
