import React,{Fragment, useEffect, useState} from 'react'
import { trimWords } from 'react-trim-words';
import { Link } from 'react-router-dom';
import Moment from 'moment';

const RecentPosts = () => {
  const [recentNews, setRecentNews] = useState([]);

  useEffect(() => {    
   fetch('/api/v1/recentposts/?limit=5')
    .then(res => res.json())
    .then(data => {
      const {posts} = data;
      setRecentNews([...recentNews, ...posts]);
    });
  }, []);

  return (
    <Fragment>
      <div className="col-lg-5 col-sm-5">
        <div className="recent_posts wow fadeInUp">
          <h3> recent posts </h3>

          {recentNews && recentNews.map(post => (
              <div key={post._id} className="recent_tbl">
                <Link to={`/post/${post.post_name}`}>
                
                <div className="rect_pic">
                  <img src={`/admin_uploads/${post.featured_image}`} alt=""/>
                </div>
                <div className="rect_txt">
                  <h4> {post.post_title}</h4>
                  <p>
                    {trimWords(post.post_content, 10, '...')}
                  </p>
                  <em> {Moment(post.post_date).format('MMMM d, YYYY')}</em>
                </div> 
                </Link>
              </div>
            ))} 
        </div>

      </div>
    </Fragment>
  )
}
export default RecentPosts;