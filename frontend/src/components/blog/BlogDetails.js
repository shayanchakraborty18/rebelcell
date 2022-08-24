import React, {Fragment, useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import {Loader} from '../layout/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { getPostDetails, clearErrors } from '../../actions/postActions';

import { useAlert } from 'react-alert';
import RecentPosts from './RecentPosts';

function BlogDetails() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, post } = useSelector(state => state.postDetails);

  useEffect(() => {
    dispatch(getPostDetails(slug));

    if(error) {
      alert.error(error);
      dispatch(clearErrors())
    }

  }, [dispatch, alert, error, slug])

  return (
    <Fragment>
      <MetaData title={post.post_title} />
      <section className="banner-sec">
          <img src="/images/landing-banner.jpg" alt=""/>
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
        {loading ? <Loader /> : (
        <Fragment>
        <section className="blog_dtls">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-sm-7">
                <div className="blg_img wow fadeInUp">
                  <img src={`/admin_uploads/${post.featured_image}`} alt="" />
                </div>
                <div className="blg_hdr wow fadeInUp">
                  <h2> {post.post_title}</h2>
                </div>
                <div className="blog_para wow fadeInUp">
                  <div dangerouslySetInnerHTML={{__html: post.post_content}} />
                </div>
                <div className="social_site wow fadeInUp">

                  <ul>
                    <li>
                      <a title="facebook-share" href={`http://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="blank"> <i className="fa fa-facebook" aria-hidden="true"></i> <em>Facebook</em> </a>
                    </li>
                    <li>
                      <a title="twitter-share" href={`http://twitter.com/https://twitter.com/intent/tweet?text=${post.post_title}&amp;url=${window.location.href}`} target="blank"> <i className="fa fa-twitter" aria-hidden="true"></i> <em>Twitter</em> </a>
                    </li>
                  </ul>
                </div>
              </div>
              <RecentPosts />
            </div>
          </div>
        </section>
        </Fragment>
      )}
      
    </Fragment>
  )
}

export default BlogDetails;