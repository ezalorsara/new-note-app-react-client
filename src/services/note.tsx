import { API } from "aws-amplify"


const  fetchNoteList = async () => {
  const result = await API.get("notes", "/notes", []);
  return result;
}

export { fetchNoteList }