import moment from "moment";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import '../../../assets/css/admin/admin-inquiry.css';
import { getContactInquiryBoard, deleteInquiryBoardFindById } from '../../../services/admin/contactService';

const Aistories = () => {
  const [data, setData] = useState([]);
  const [headerCheckboxChecked, setHeaderCheckboxChecked] = useState(false); // 헤더 체크박스 상태
  const [selectedItems, setSelectedItems] = useState([]); // 체크박스

  //페이징 변수
  const itemsPerPage = 10; // 한 페이지에 표시할 데이터 수
  const [pageCount, setPageCount] = useState(1);
  const params = useParams();
  const page = parseInt(params.page) ? parseInt(params.page) : 1;

  //목록 조회
  const getInquiryList = async () => {
    const result = await getContactInquiryBoard(); //

    if(result) {
      setData(result); //결과값 data 변수에 저장
      setPageCount(Math.ceil(result.length / itemsPerPage)); //페이징
    }
  };

	//DB연결
  useEffect(() => {
    getInquiryList();
  }, []);

/*
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("/api/tb_inquiry/data")
      .then(response => response.json())
      .then(data => {
        const resdata = data
          .map((resd) => ({
            ...resd,
            "content": resd.content.length > 30 ? resd.content.slice(0, 30) : resd.content
          }))
          .sort((a, b) => moment(b.created_date) - moment(a.created_date)); // 최신순 정렬
        setData(resdata);
        setPageCount(Math.ceil(resdata.length / itemsPerPage));
      })
      .catch(error => console.log("에러입니다", error));
  };
*/


  // 개별체크박스 변경: 사용자가 체크박스 클릭 시 해당 항목의 id값이 selectedItems에 추가되거나 제거됨
  const handleCheckboxChange = (id) => {
    console.log("체크박스", selectedItems)
    setSelectedItems((prevSelectedItems) =>

      prevSelectedItems.includes(id) // 체크박스 선택/해제 조건값
        ? prevSelectedItems.filter((item) => item !== id)
        : [...prevSelectedItems, id]
    );
  };


  // 전체체크박스 변경
  const handleHeaderCheckboxChange = () => {
    const isChecked = !headerCheckboxChecked; // 현재 체크박스 전체 반전
    setHeaderCheckboxChecked(isChecked); //반전된 값 업데이트
    if (isChecked) { // 전체 선택을 체크한 경우
      const currentIds = paginatedData.map(item => item.inquiry_id); //현재 페이지의 모든 항목 배열로
      setSelectedItems(currentIds);
    } else {
      setSelectedItems([]);
    }
  };

  // DB 삭제
    //삭제
  const handleDelete = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      setData((prevData) => prevData.filter(item => !selectedItems.includes(item.inquiry_id)));
      setSelectedItems([]); // 체크박스 해제
      try {
        let result = await deleteInquiryBoardFindById( {selectedItems} );
        if(result){
          getInquiryList(); //목록 조회
        }
      } catch (error) {
        console.error("삭제 중 오류가 발생했습니다:", error);
      } finally {
        setSelectedItems([]); //삭제 아이템 목록 비우기
      }
    }
  };
  

/*
  const handleDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      // 먼저 UI에서 데이터를 제거
      setData((prevData) => prevData.filter(item => !selectedItems.includes(item.inquiry_id)));
      setSelectedItems([]); // 체크박스 해제

      // 그 다음 서버에 삭제 요청
      Promise.all(
        selectedItems.map((id) =>
          axios.delete(`/api/tb_inquiry/delete`, { data: { id, id_name: 'inquiry_id' } })
        )
      )
        .catch(error => console.log("삭제 중 에러가 발생했습니다.", error));
    }
  };
*/

  // 페이징 처리 ------------------------------------

  const isPageStart = page === 1;
  const isPageOver = page === pageCount;

  // 한 번에 보여줄 페이지 번호의 수
  const displayPageRange = 9;

  // 현재 페이지의 데이터를 계산
  const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // 페이지 번호를 생성하는 함수
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, page - Math.floor(displayPageRange / 2)); // 시작 페이지 번호 계산
    const endPage = Math.min(startPage + displayPageRange - 1, pageCount); // 끝 페이지 번호 계산

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Link key={i} to={`/admin/Contact/inquriy/page/${i}`} className={`page-btn ${page === i ? 'active' : ''}`}>
          {i}
        </Link>
      );
    }

    return pageNumbers;
  };
  //---------------------------------------

  return (
    <div style={{ marginLeft: "260px" }}>
      <div className="card">
        <div className="card_top">
          <h3 className="title">
            영업문의
          </h3>
        </div>

        <button onClick={handleDelete} className="delete-button">선택 삭제</button>



        <table className="table" id="period-table">
          <thead>
            <tr>
              <th className="tabel small-width">
                <input
                  type="checkbox"
                  className="header-checkbox"
                  checked={headerCheckboxChecked}
                  onChange={handleHeaderCheckboxChange} />
                번호
              </th>
              <th className="tabel large-width">문의 내용</th>
              <th className="tabel medium-width">회사명</th>
              <th className="tabel small-width">작성시간</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="tabelcontent">
                    <input type="checkbox"
                      className="row-checkbox"
                      checked={selectedItems.includes(item.inquiry_id)}
                      onChange={() => handleCheckboxChange(item.inquiry_id)} />
                    {item.inquiry_id}
                  </td>
                  <td className="tabelcontent admincontent">
                    <Link to={`/admin/Contact/inquriy/${item.inquiry_id}`}>
                      <div>
                        {item.content}
                      </div>
                    </Link>
                  </td>
                  <td className="tabelcontent company">{item.company}</td>
                  <td className="tabelcontent inquirydate">{moment(item.created_date).format("YYYY. MM. DD")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>




        {/* 페이징 처리 구역 */}
        <div className='paging'>
          <Link to={pageCount > 1 ? `/admin/Contact/inquriy/page/1` : '#'} className='first'></Link>
          <Link to={pageCount > 1 && !isPageStart ? `/admin/Contact/inquriy/page/${page - 1}` : '#'} className='prev'></Link>
          {renderPageNumbers()}
          <Link to={pageCount > 1 && !isPageOver ? `/admin/Contact/inquriy/page/${page + 1}` : '#'} className='next'></Link>
          <Link to={pageCount > 1 ? `/admin/Contact/inquriy/page/${pageCount}` : '#'} className='last'></Link>
        </div>



      </div>
    </div>
  );
}

export default memo(Aistories);
