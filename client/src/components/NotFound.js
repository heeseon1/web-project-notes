import { memo, useEffect, useState} from "react";
import { useNavigate  } from 'react-router-dom';

const NotFound = () => {
    const [count, setCount] = useState(5); // 초 카운트
    const navigate = useNavigate(); // 링크 이동

    // 초 카운트
    useEffect ( () => {
        const id = setInterval(() => {
            setCount( c => c - 1);
        }, 1000);

        if(count === 0){
            //clearInterval(id);
            navigate('/');
        }
        return () => clearInterval(id);
    }, [count]);


  return (
    <div style={{ display: "flex",  flexDirection: "column", alignItems: "center", justifyContent: "center", height: "70vh" }}>
    <p>
        <b><font style={{ fontSize: "48px", color: "#000000" }}>Oops!!</font></b>
    </p>
    <br/><br/>
    <p>페이지를 찾을 수 없습니다. {count}초 후에 메인 화면으로 이동합니다.</p> 
    </div>
  );
};

export default memo(NotFound);
