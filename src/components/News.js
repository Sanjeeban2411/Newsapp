import React, { Component } from 'react';
// import { unstable_renderSubtreeIntoContainer } from 'react-dom/cjs/react-dom.development';
import Newsitem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

class News extends Component {

        static propTypes = {
            country: PropTypes.string,
            category: PropTypes.string,
            pageSize: PropTypes.number
        };
        static defaultProps = {
            country: "in",
            category: "general",
            pageSize: 9
        };
        constructor(){
            super();
            this.state={
                articles:[ ],
                loading:false,
                page:1,
                totalResults:0
            }
        }

        
        updateNews=async(pageNo)=>{
                let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=30d259c5079e4612a3ea27e82d632022&page=${pageNo}&pageSize=${this.props.pageSize}`
                this.setState({ loading:true});
                let data = await fetch(url);
                let parsedData = await data.json();
                this.setState({
                    articles: parsedData.articles,
                    totalResult:parsedData.totalResults,
                    loading:false,
                    page: pageNo
                })
                // console.log(this.state.page)
        }
        
        async componentDidMount(){
            this.updateNews(this.state.page);  
        };

        // next= async ()=>{
        //     if(this.state.page < Math.ceil(this.state.totalResult/this.props.pageSize)){
        //     this.setState({page:this.state.page+1});
        //     this.updateNews(this.state.page+1);
        //     }
        //     else{
        //     }
        // }
        // prev= async ()=>{
        //     this.setState({page:this.state.page-1});
        //     await this.updateNews(this.state.page-1);
        // }
        
        heading = ()=>{
            if(this.props.category==='general'){
                return "Top Headlines"
            }
            else{
                return this.props.category.charAt(0).toUpperCase()+this.props.category.slice(1)
            }
        }
        fetchMoreData = async() => {
            this.setState({page:this.state.page+1});
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=30d259c5079e4612a3ea27e82d632022&page=${this.state.page}&pageSize=${this.props.pageSize}`
            this.setState({ loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                    articles: this.state.articles.concat(parsedData.articles),
                    totalResult:parsedData.totalResults,
                    loading:false,

            })
            console.log(this.state.page)
        }
        
        top = async() =>{
            this.setState({page:1})
            await this.updateNews(1)
            console.log(this.state.page)
            console.log("abc")
        }

        
        render() {
            
        return (
            <div className='container my-3'>
                <h1 className='mt-4'>NewsMonkey - {this.heading()}</h1>

                 <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.page!==this.state.totalResults}
                loader={this.state.page < Math.ceil(this.state.totalResult/this.props.pageSize) && <Spinner/> }
                >                 
                <div className='container row my-5'>
                    {this.state.articles.map((element)=>{
                        return(
                                <div className='col-md-4 my-3' key={element.url}>
                                    <Newsitem title={element.title} description={element.description} imageUrl={!element.urlToImage?"https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg":element.urlToImage} articleUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                                </div>
                        )
                    })}
                </div>
                </InfiniteScroll>
                <div className="d-flex flex-row-reverse bd-highlight">
                    <button type="button" className="btn btn-dark p-2 bd-highlight" style={{borderRadius:"50px"}} onClick={this.top}>&#160; &#8593; &#160;</button>
                </div>
            </div>
        );
    }
}

export default News;
