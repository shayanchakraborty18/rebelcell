import React, {Fragment, useEffect, useState} from 'react';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';

import { trimWords } from 'react-trim-words';
import Moment from 'moment';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/postActions';

import { useAlert } from 'react-alert';


function BlogList() {

  const [ currentPage, setCurrentPage] = useState(1);
  const [recentNews, setRecentNews] = useState([]); 

  const dispatch = useDispatch();
  const alert = useAlert();

  const {loading, posts, error, postsCount, resPerPage}  = useSelector(state => state.posts);

  useEffect(() => {
    if(error) {
      return alert.show(error);
    }
    
    dispatch(getPosts(currentPage));
  }, [dispatch, error, alert, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    fetch('/api/v1/recentposts/?limit=3')
    .then(res => res.json())
    .then(data => {
      const {posts} = data;
      setRecentNews([...recentNews, ...posts]);
    });
  }, [])

   let count = postsCount;

  return (
    <Fragment>
      
      {loading ? <Loader /> :
      <Fragment>
        <MetaData title={'Rebelcell News'} />
        <section className="banner-sec">
            <img src="images/landing-banner.jpg" alt=""/>
            <div className="container">
                <div className="banner-txt">
                    <h1>news</h1> 
                     <ul className="breadcrumb">
                          <li><Link to="/">Home</Link></li>
                           <li>news</li>
                     </ul>
                </div>
            </div>
        </section>
        <section className="blog-innr-sec wow fadeInUp">
            <div className="container">
                <div className="blog-innr-outr">
                    <div className="row">
                        <div className="col-lg-8 col-sm-8">
                          {posts && posts.map(post => (
                            <div key={post._id} className="bg-innr-left">
                                <div className="bg-img">
                                  <Link to={`/post/${post.post_name}`}>
                                    <img src={`/admin_uploads/${post.featured_image}`} alt=""/>
                                  </Link>
                                </div> 
                                <div className="bg-txt">
                                  <h3>{post.post_title} </h3>
                                  <h5>By: {post.post_author.name}  {Moment(post.post_date).format('MMMM d, YYYY')} </h5>
                                  <p>{trimWords(post.post_content, 30, '...')}
                                  <Link to={`/post/${post.post_name}`}>Read more</Link>
                                  </p>
                                </div> 
                              <div className="border-bottom"></div>
                            </div>
                          ))}

                            {resPerPage <= count && (
                              <div className="blog-pegination text-center">
                                <div className="pegination">
                                  <Pagination 
                                    activePage={currentPage}
                                    itemsCountPerPage={resPerPage}
                                    totalItemsCount={postsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText={'NEXT'}
                                    prevPageText={'PREV'}
                                    innerClass={''}
                                    firstPageText={''}
                                    lastPageText={''}
                                    //itemClass="page-item"
                                    //linkClass="page-link"
                                  />
                                </div>                    
                              </div>
                            )}
                            
                        </div>
                        
                      
                        <div className="col-lg-4 col-sm-4">
                        <h4 className='recent-news'>Recent news</h4>
                        {recentNews && recentNews.map(post => (
                          <div key={post._id} className="bg-innr-right">
                              <Link to={`/post/${post.post_name}`}>
                              <img src={`/admin_uploads/${post.featured_image}`} alt=""/>
                              </Link>
                              <div className="bg-innr-txt">
                                  <h4>{post.post_title}</h4>
                                  <h5>By: {post.post_author.name}   {Moment(post.post_date).format('MMMM d, YYYY')}</h5>
                              </div>
                          </div>
                        ))}
                          

                      </div>
                    </div>
                </div>
           </div>
        </section>
    </Fragment>
    }
    </Fragment>
  )
}

export default BlogList;