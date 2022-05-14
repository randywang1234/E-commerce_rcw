import React,{useState} from 'react'
import "../style/pagination.css"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage,setCurrentPage }) => {

    const [page, setPage]= useState(1)

    const pageNumbers = [];
    console.log(currentPage)
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }
    console.log(pageNumbers)
    console.log(page)


  const nextPage = () => {
    setCurrentPage((oldpage)=>{
      let nextPage = oldpage + 1
      if (nextPage > pageNumbers.length ){
        nextPage = 1
      }
      return nextPage
    })
    
    setPage(()=>{
      let nextPage = currentPage + 1
      if( nextPage  > pageNumbers.length){
        return 1
      }
      return nextPage
    })
  }


  const prevPage = () => {
    setCurrentPage((oldpage)=>{
      let prevPage = oldpage - 1
      if (prevPage < 1){
        prevPage = pageNumbers.length
      }
      return prevPage
    })

    setPage(()=>{
      let nextPage = currentPage - 1
      if( nextPage < 1){
        return pageNumbers.length
      }
      return nextPage
    })

  }
   
  
  const handlePage = (number) => {
    setPage(number)
  }
  
  return (
    <nav>
      
      <ul className='pagination'>
        <NavigateBeforeIcon onClick={prevPage} sx={{ cursor: "pointer" }}/>
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${number === page ? 'active-btn' : null}`} onClick={()=>{
            paginate(number)
            handlePage(number)
            }}> 
              {number}
          </li>
        ))}
        <NavigateNextIcon onClick={nextPage} sx={{ cursor: "pointer" }}/>
      </ul>
    </nav>
  )
}

export default Pagination