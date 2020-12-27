import React from "react";
import "./Product.css"
import DetailsThumb from "./DetailsThumb";
import RatingStar from "./RatingStar";
import { fetchItem } from "../../services/ItemService";

export default class Product extends React.Component {
 constructor(props)
 { super( props)
    this.state = {
    index: 0,
  };
 }

  getItem = async() => {
    const params = this.props.match.params
    const res = await fetchItem(params.id);
    if (res.status === 200) {
        this.setState({
          ...this.state,
          product: res.data,
        })
        console.log( res.data)
    } else console.log("tt")
}

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

 myRef = React.createRef();
    handleTab = (index) => {
      this.setState({ index: index });
      const images = this.myRef.current.children;
      console.log(this.myRef.current)
      for (let i = 0; i < images.length; i++) {
        images[i].className = images[i].className.replace("active", "");
      }
      images[index].className = "active";
    };

  componentDidMount() {
    this.getItem()
    // const index = this.state.index;
    // console.log(this.myRef.current.children)
    //  this.myRef.current.children[index].className = "active";
  }

  render() {
    const product = this.state.product;
    const index = this.state.index;
    if (product === undefined) return (<div>Khong tim thay</div>)
    const src=`data:image/*;base64, ${product.danhSachHinhAnh[index] !== undefined ? product.danhSachHinhAnh[index].anh: ""}`
    return (
        
        <>
            <div className="container">
                <div className={"row"}>
                    <div className="col-1"></div>
                    <div className="col-5">
                        <img src={src} className="image-show" alt="" />
                    </div>
                    <div className="col-6 box-details ">
                        <h1>{product.tenMatHang}</h1>
                        <p>Price: {product.gia}$</p>
                        <p>{product.moTa}</p>
                        {<DetailsThumb 
                          images={product.danhSachHinhAnh}
                          tab={this.handleTab}
                          myRef={this.myRef} 
                        />}
                        <button className="btn btn-primary ">Thêm vào giở hàng </button>
                    </div>
                </div>  
                <br></br>
                <h2> Đánh giá của bạn</h2>
                <div className= "row">
                    <div className = "col-8">
                        <textarea className="comment" rows="4" type="text" placeholder="Đánh giá của bạn" />
                    </div>
                        <div className = "col-4 danhgia">
                            <div>
                                <RatingStar />
                            </div>
                            <div>
                                <button className="btn btn-primary btn-comment"> Đánh giá </button> 
                            </div>
                    </div>
                </div>
                <div>      
                    <h2> Đánh giá của khách hàng</h2>
                      <p> -{product.danhGia} </p>
                      {/* {product.map(product => <p key={product.maMatHang} name={product.danhGia} />)} */}
                 </div>
            </div>
      </>
    );
  }
}


