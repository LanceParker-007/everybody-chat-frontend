export const getSender = (loggedUser = {}, users = []) => {
  return users[0]?._id === loggedUser?._id ? users[1]?.name : users[0]?.name;
};
//users[0]? kyun idhar

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

// Used in ScrollableChat, To show profile picture
export const isSameSender = (messages, m, i, userId) => {
  // console.log('Messages: ', messages);
  // console.log('UserId: ', userId);
  return (
    i < messages.length - 1 &&
    (messages[i + 1]?.sender?._id === undefined ||
      messages[i + 1]?.sender?._id !== m.sender?._id) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1]?.sender?._id !== userId &&
    messages[messages.length - 1]?.sender?._id
  );
};

//Same sender margin
export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    messages &&
    i < messages.length - 1 &&
    messages[i + 1]?.sender?._id === m.sender?._id &&
    messages[i]?.sender?._id !== userId
  )
    return 33;
  else if (
    (messages &&
      i < messages.length - 1 &&
      messages[i + 1]?.sender?._id !== m.sender?._id &&
      messages[i]?.sender?._id !== userId) ||
    (i === messages.length - 1 && messages[i]?.sender?._id !== userId)
  )
    return 0;
  else return 'auto';
};

//m is current message
export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1]?.sender?._id === m?.sender?._id;
};
