import axios from "axios";
import { useState, useEffect, useRef } from "react";
import usePrevState from "./hooks/usePrevState";

// import logo from './logo.svg';
import "./App.css";
// import axios from "axios";

function App() {
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");

  // rules for all useEffect status:
  //1-render
  //2-useeffect
  //////////////////////////////////////////////           (1)             ////////////////////////////////////////////////////////////
  // useeffest with empty dependency array
  // run one time only
  //when:after first render
  //-------------
  //render
  //useeffect
  // useEffect(
  //   () => {
  //     //ADD YOUR CODE HERE
  //   },
  //   [] //USEEFFECT DEPENDENCY ARRAY
  // );
  //////////////////////////////////////////////           (2)             ////////////////////////////////////////////////////////////
  // useEffect with not empty dependency array
  //run when update happen
  //when: after first render, and when dependency updated
  //render
  //useEffect
  //update the state -> re-render (sec render)
  // useeffect -> watcher -> dependency -> name ? updated -> yes -> do the effect / no -> skip the effect
  // useEffect(() => {
  //   if (name) {
  //     console.log("update");
  //   }
  //   console.log("render");
  // }, [name]); //useeffect dependency array
  //watcher: state , probs , var
  //////////////////////////////////////////////           (3)             ////////////////////////////////////////////////////////////
  //use effect wit no dependency array
  //run when update happen
  //when: run after first render, and after re-render
  // useEffect(() => {
  //   console.log("effect");
  // });
  //render
  //change->state
  //re-render
  //useeffect
  //////////////////////////////////////////////           (4)             ////////////////////////////////////////////////////////////
  //clean up
  // useEffect(() => {
  //   // if (name) {
  //   const timeOut = setTimeout(() => {
  //     console.log("effect");
  //   }, 2000);
  //   return () => {
  //     clearTimeout(timeOut);
  //   };
  //   // }
  // }, [name]);
  //render
  //use effect
  //return / init clean up
  // change state
  // render
  //clenup execute
  // use effect -> watcher -> name updated ->run
  // return / init cleanup
  //////////////////////////////////////////////           explain example             ////////////////////////////////////////////////////////////
  //   <div className="App">
  //   <label htmlFor="name">name</label>
  //   <input
  //     type="text"
  //     id="name"
  //     value={name}
  //     onChange={(e) => setName(e.target.value)}
  //   />
  //   <label htmlFor="phone">phone</label>
  //   <input
  //     type="text"
  //     id="phone"
  //     value={phone}
  //     onChange={(e) => setPhone(e.target.value)}
  //   />

  //   <p>
  //     name:{name}
  //     <br />
  //     phone:{phone}
  //     <br />
  //   </p>
  // </div>
  //////////////////////////////////////////////           End             ////////////////////////////////////////////////////////////

  const [Term, setTerm] = useState("");
  const [Result, setResult] = useState([]);
  ////////////////////////////////////////first way bad optimization //////////////////////////////////////////////////
  // useEffect(() => {
  //   const search = async () => {
  //     const respond = await axios.get("https://en.wikipedia.org/w/api.php", {
  //       params: {
  //         action: "query",
  //         list: "search",
  //         srsearch: Term,
  //         format: "json",
  //         origin: "*",
  //       },
  //     });
  //     setResult(respond.data.query.search);
  //   };
  //   if (!Result.length) {
  //     if (Term) {
  //       search();
  //     }
  //   } else {
  //     const depounceSearch = setTimeout(() => {
  //       if (Term) {
  //         search();
  //       }
  //     }, 1500);
  //     return () => {
  //       clearTimeout(depounceSearch);
  //     };
  //   }
  // }, [Term, Result.length]);
  /////////////////////////////////////////second way depend on state doesnot change //////////////////////////////////////////
  // const [depounce, setDepounce] = useState(Term);
  // useEffect(() => {
  //   if (Term) {
  //     const timeOut = setTimeout(() => {
  //       setDepounce(Term);
  //     }, 1200);
  //     return () => {
  //       clearTimeout(timeOut);
  //     };
  //   }
  // }, [Term]);

  // useEffect(() => {
  //   if (depounce) {
  //     const search = async () => {
  //       const respond = await axios.get("https://en.wikipedia.org/w/api.php", {
  //         params: {
  //           action: "query",
  //           list: "search",
  //           srsearch: depounce,
  //           format: "json",
  //           origin: "*",
  //         },
  //       });
  //       setResult(respond.data.query.search);
  //     };
  //     search();
  //   }
  // }, [depounce]);

  const fetchResult = Result.map((el) => {
    return (
      <tr key={el.pageid}>
        <td>1</td>
        <td>{el.title}</td>
        <td>
          <span dangerouslySetInnerHTML={{ __html: el.snippet }} />
        </td>
      </tr>
    );
  });
  // return (
  //   <div className="App">
  //     <div className="container">
  //       <div className="row">
  //         <div className="col">
  //           <div className="my-3">
  //             <label className="form-label" htmlFor="example">
  //               Search input
  //             </label>
  //             <input
  //               type="text"
  //               className="form-control"
  //               id="example"
  //               value={Term}
  //               onChange={(e) => {
  //                 setTerm(e.target.value);
  //               }}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //       <div className="row">
  //         <div className="col">
  //           <table className="table">
  //             <thead>
  //               <tr>
  //                 <th scope="col">#</th>
  //                 <th scope="col">title</th>
  //                 <th scope="col">desc</th>
  //               </tr>
  //             </thead>
  //             <tbody>{fetchResult}</tbody>
  //           </table>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  /////////////////////////////////////////third way get prevstate using useref //////////////////////////////////////////
  /////////////////////////////////////////explain the concept //////////////////////////////////////////
  // use ref not trigger render
  // const prevTermState = useRef();
  // useEffect(() => {
  //   prevTermState.current = Term;
  // });
  // const prevTerm = prevTermState.current;

  // 1- initiate the component   Terrm(javascript)
  // state -> javascript / useRef -> undefined (one time only)
  // skip -> useeffect
  // prevTerm -> useRef.current ->undefined
  // render -> terrm(javascript) / useref(undefined)
  // do the effect -> useref.current = term ->javascript

  // 2- change -. state
  // skip -> useeffect
  // prevTerm -> useReff.current ->javascript
  // render -> term(javascript2) / useRef(javascript)
  // do the effect -> useRef.current =term ->javascript2
  // return (
  //   <div className="App">
  //     <div className="container">
  //       <div className="row">
  //         <div className="col">
  //           <div className="my-3">
  //             <label className="form-label" htmlFor="example">
  //               Search input
  //             </label>
  //             <input
  //               type="text"
  //               className="form-control"
  //               id="example"
  //               value={Term}
  //               onChange={(e) => {
  //                 setTerm(e.target.value);
  //               }}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //       <div>
  //         <p>current Term :{Term}</p>
  //         <p>prev Term :{prevTerm}</p>
  //       </div>
  //     </div>
  //   </div>
  // );
  /////////////////////////////////////////start //////////////////////////////////////////
  const prevTerm = usePrevState(Term);
  // useEffect(() => {
  //   termUseRef.current = Term;
  // });
  // const prevTerm = termUseRef.current;
  useEffect(() => {
    // API
    const search = async () => {
      const respond = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          srsearch: Term,
          format: "json",
          origin: "*",
        },
      });
      setResult(respond.data.query.search);
    };
    if (!Result.length) {
      if (Term) {
        search();
      }
    } else if (prevTerm !== Term) {
      const depounceSearch = setTimeout(() => {
        if (Term) {
          search();
        }
      }, 1500);
      return () => {
        clearTimeout(depounceSearch);
      };
    }
  }, [Term, Result.length, prevTerm]);
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="my-3">
              <label className="form-label" htmlFor="example">
                Search input
              </label>
              <input
                type="text"
                className="form-control"
                id="example"
                value={Term}
                onChange={(e) => {
                  setTerm(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">title</th>
                  <th scope="col">desc</th>
                </tr>
              </thead>
              <tbody>{fetchResult}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
