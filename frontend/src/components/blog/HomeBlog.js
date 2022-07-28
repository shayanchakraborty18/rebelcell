import React, {Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import { trimWords } from 'react-trim-words';
import Moment from 'moment';

function HomeBlog() {
  const [recentNews, setRecentNews] = useState([]); 

  async function getRecentNews() {
    const res  = await fetch('/api/v1/recentposts/?limit=3');
    const data = await res.json();
    const {posts} = data;
    setRecentNews([...recentNews, ...posts]);
  }

  useEffect(() => {
    getRecentNews();
  }, []);

  return (
    <section className="news-sec">
      <div className="container">
            <div className="commn-header text-center">
              <h5>Read The Latest</h5>
              <h3>Rebelcell News</h3>
          </div>
          <div className="news-outr">
              <div className="row">
                {recentNews && recentNews.map(post => (
                  <div key={post._id} className="col-lg-4 col-sm-4">
                      <div className="news-innr">
                          <img src={`/admin_uploads/${post.featured_image}`} alt=""/>
                          <div className="news-txt">
                              <h5>{Moment(post.post_date).format('MMMM d, YYYY')}</h5>
                              <h3>{post.post_title}</h3>
                              <p>{trimWords(post.post_content, 20, '...')}</p>
                              <div className="reading text-right">
                                <Link to={`/post/${post.post_name}`}>
                                  <a >Continue Reading</a>
                                </Link>
                              </div>
                          </div>
                      </div>
                  </div>
                ))}
                  
              </div>
              <div className="read-more text-center">
                  <Link to="/news" className="ban-btn">Read More News</Link>
              </div>
          </div>
      </div>
    </section>
  )
}

export default HomeBlog