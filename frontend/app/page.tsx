import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        pb: 50
      }}>
      <Typography variant="h1" sx={{ fontSize: "6rem", color: "text.secondary" }}>DevUtils</Typography>
      <Typography variant="h6">A Swiss army knife for developers</Typography>
    </Stack>
  );
};

export default Home;
