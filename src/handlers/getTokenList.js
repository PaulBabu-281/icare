import axios from "axios";
// import { useDispatch } from "react-redux";
// simport { getToken } from "../../redux/tokenSlice";
//const dispatch = useDispatch();
export default async function getTokenList() {
  await axios({
    method: "get",
    url: " https://deploy-test-idoc.herokuapp.com/health/showHealth/",
    //responseType: "stream",
  }).then(function (response) {
    //console.log(response);
    console.log(response.data.data);
    return response.data.data;
    //dispatch(getToken(response.data.data));
    // state.value = response.data.data.slice();
    // response.data.data.forEach((element) => {
    //   console.log(element.temperature);
    //   state[i].temperature = Number(element.temperature);
    //   state[i].BPM = element.pulse;
    //   state[i].weight = element.oxygen;
    //   i++;
    // });
  });
}
