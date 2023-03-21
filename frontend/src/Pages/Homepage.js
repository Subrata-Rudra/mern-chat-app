import { React, useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Center,
  Stack,
  Link,
} from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
import { useHistory } from "react-router-dom";

const Homepage = () => {
  const history = useHistory();

  //this means if the user already exists(means user is logged in, because if the user is logged in, then user should be there because user is gotten from localstorage, and we know that userInfo is stored to the localstorage when any user is being logged in) we will redirect the user to the chatpage(i.e login/sign-in page)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      history.push("/chats");
    }
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          // fontSize="4xl"
          fontSize={{ base: "3xl", md: "4xl" }}
          fontFamily="Work sans"
        >
          <Center>Chat-ONN</Center>
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Container
        as={Stack}
        maxW={"6xl"}
        mt={{ base: "10px", md: "50px" }}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Stack
          color="white"
          fontFamily="Work sans"
          fontWeight="bold"
          direction={"row"}
          spacing={6}
        >
          <Link href={"https://github.com/Subrata-Rudra"} target="_blank">
            GitHub
          </Link>
          <Link
            href={"https://www.linkedin.com/in/subrata-rudra-b481741b7/"}
            target="_blank"
          >
            LinkedIn
          </Link>
          <Link
            href={"https://www.facebook.com/subrata.rudra.982/"}
            target="_blank"
          >
            FaceBook
          </Link>
        </Stack>
        <Text
          color="white"
          fontFamily="Work sans"
          fontWeight="bold"
          fontSize="16px"
        >
          Made with ❤️ by Subrata Rudra
        </Text>
      </Container>
    </Container>
  );
};

export default Homepage;
