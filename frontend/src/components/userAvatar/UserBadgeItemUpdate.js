import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";

const UserBadgeItemUpdate = ({ user, handleFunction }) => {
  const { selectedChat } = ChatState();
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      {...(selectedChat.groupAdmin._id === user._id
        ? { colorScheme: "green" }
        : { colorScheme: "purple" })}
      cursor="pointer"
      onClick={handleFunction}
    >
      {loggedInUser._id !== user._id
        ? selectedChat.groupAdmin._id === user._id
          ? "Admin: " + user.name
          : user.name
        : selectedChat.groupAdmin._id === user._id
        ? "Admin: " + user.name + " (You)"
        : user.name + " (You)"}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItemUpdate;
