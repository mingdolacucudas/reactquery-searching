import "./App.css";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { useRef, useState } from "react";

//!우선 데이터를 가져온다.
const api요청함수get = () => {
  return axios.get("http://localhost:4000/sleep_times");
};
//?--------------------------------------------------
function App() {
  let [keyword, setKeyword] = useState("");

  //!인풋값 가져오기
  const searching = useRef("");
  const queryClient = useQueryClient();
  //!usequery: 데이터를 가져와서 캐싱하기 위해 사용(쿼리키, 쿼리함수, 옵션)
  const 쿼리 = useQuery("querykey", api요청함수get, {
    onSuccess: (data) => {
      //!데이터 패칭 성공시 콜백함수
      console.log(data);
    },
    onError: () => {
      //!데이터 패칭 실패시 콜백함수
      console.log("왜안될까...");
    },
  });
  //! 로딩전이면 데이터가 뜨지 않는다.
  if (쿼리.isLoading) {
    return null;
  }
  //!filter
  const 데이터 = 쿼리.data.data;
  const test = 데이터.filter((x) => x.day === keyword);
  //!includes
  const test2 = 데이터.filter(
    (x) => x.day != undefined && x.day.includes(keyword)
  );

  //?------------------------------------------
  return (
    <div className="App">
      <header>
        <h2>오늘의 음악 검색하기</h2>
      </header>
      <form>
        <button>검색하기</button>
        <div>
          <input
            ref={searching}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          {keyword === ""
            ? null
            : test2.map((x, i) => {
                return (
                  <div className="auto-box">
                    <span className="auto-value">{x.day}</span>
                    <span className="auto-value">{x.sleep_time}</span>
                  </div>
                );
              })}
        </div>
      </form>

      {/* {쿼리.data.data.map((d) => {
        return (
          <div key={d.id}>
            <span>{d.day} </span>
            <span>{d.sleep_time} </span>
          </div>
        );
      })} */}
    </div>
  );
}

export default App;
