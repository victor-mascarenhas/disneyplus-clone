import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import { collection, getDocs } from "firebase/firestore";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let newDisney = [];
  let originals = [];
  let trending = [];

  async function getFromFirebase() {
    const querySnapshot = await getDocs(collection(db, "movies"));

    querySnapshot.forEach((doc) => {
      switch (doc.data().type) {
        case "recommend":
          recommends = [...recommends, { id: doc.id, ...doc.data() }];
          break;
        case "new":
          newDisney = [...newDisney, { id: doc.id, ...doc.data() }];
          break;
        case "original":
          originals = [...originals, { id: doc.id, ...doc.data() }];
          break;
        case "trending":
          trending = [...trending, { id: doc.id, ...doc.data() }];
          break;
        default:
          break;
      }
    });

    dispatch(
      setMovies({
        recommend: recommends,
        newDisney: newDisney,
        originals: originals,
        trending: trending,
      })
    );
  }

  useEffect(() => {
    getFromFirebase();
  }, [userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

export default Home;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
