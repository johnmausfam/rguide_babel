import React from 'react'
import PropTypes from 'prop-types'
import Classnames from 'classnames'
import "../css/Book.scss"

const Layout_frontCover = ({title,image,author}) => {
  return (
    <div className="c_bk_lo frontCover">
      <h1>{title}</h1>
      {(()=>{
        if(image){
          return (
            <div className="imageBox">
              <img src={image} />
            </div>
          )
        }
      })()}
      <h2>{author}</h2>
    </div>
  )
}

const Layout_inner = ({content}) => {
  return (
    <div className="c_bk_lo inner">
      {content}
    </div>
  )
}

const LAYOUT_TYPE = [Layout_frontCover,Layout_inner];

class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={Classnames('c_bk_pg',this.props.className)}>
        {(()=>{
          if(this.props.withHead){
            return(
              <div className="pageHead">
                <div className="pageTitle">{this.props.title}</div>
                <div className="pageNumber">{this.props.pageNumber}</div>
              </div>
            )
          }
        })()}
        <div className="pageContent">
          {React.createElement(this.props.layout,this.props.data)}
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  pageNumber:PropTypes.number.isRequired,
  layout:PropTypes.oneOf(LAYOUT_TYPE).isRequired,
  data:PropTypes.object.isRequired,
  className:PropTypes.string,
  title:PropTypes.string,
  withHead:PropTypes.bool
}

Page.defaultProps = {
  withHead:true,
  title:""
};



class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      currentPage:0,
      direction:0
    }
  }

  getPageClass(pageIndex){
    var classes = [];
    if(pageIndex == this.state.currentPage)
      classes.push("curr");
    else if(pageIndex < this.state.currentPage){ 
      classes.push("prior");
      if(pageIndex == this.state.currentPage-1)
        classes.push("prev");
    }
    else if(pageIndex > this.state.currentPage){
      classes.push("after")
      if(pageIndex == this.state.currentPage+1)
        classes.push("next");
    };
    return classes;
  }

  movePage(v){
    var nv = this.state.currentPage+v;
    if(nv < 0 || nv > this.props.data.pages.length-1){
      return;
    }

    this.setState((prevState, props) => ({
        currentPage: nv,
        direction:nv-prevState.currentPage
    }));
  }

  render() {
    return (
      <div className={Classnames('c_bk',this.props.className,(this.state.direction < 0 ? "dir_right" : "dir_left"))}>
        {this.props.data.pages.map((page,index)=>{
          return (
            <Page 
              key={index} 
              className={Classnames(this.getPageClass(index))} 
              withHead={index > 0} 
              pageNumber={index} 
              title={this.props.title}
              data={page.data}
              layout={page.layout} />
          )
        })}
        <div className="c_bk_nav">
          <button onClick={()=>this.movePage(-1)}>Prev</button>
          <button onClick={()=>this.movePage(1)}>Next</button>
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  className:PropTypes.string,
  data:PropTypes.shape({
    title:PropTypes.string.isRequired,
    pages:PropTypes.arrayOf(PropTypes.shape({layout:PropTypes.oneOf(LAYOUT_TYPE).isRequired,data:PropTypes.object.isRequired})).isRequired
  }).isRequired
}

Book.defaultProps = {
};

export default Book;

import REACT_LOGO from "images/react-logo.png"
export const BOOK_DATA = {
  "React":{
    "title":"About React",
    "pages":[
      { layout:Layout_frontCover, data:{ title:"React", image:REACT_LOGO,author:"fam" } },
      { layout:Layout_inner, data:{ content:<p>Power of React</p> } },
      { layout:Layout_inner, data:{ content:<p>Art of React</p> } },
      { layout:Layout_inner, data:{ content:<p>Beauty of React</p> } },
      { layout:Layout_inner, data:{ content:<p>Love of React</p> } },
      { layout:Layout_inner, data:{ content:<p>Attractive of React</p> } }
    ]
  }
};