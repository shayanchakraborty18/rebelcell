import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import {useAlert} from 'react-alert';
import axios from 'axios';
import {SmallLoader as Loader} from '../layout/Loader';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyname, setCompanyName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const alert = useAlert();


  const onChangeHandler = (fieldName, value)=>{
    if(fieldName === "name"){
      setName(value);
    }else if(fieldName === "email"){
      setEmail(value);
    }else if(fieldName === "companyname"){
      setCompanyName(value);
    }else if(fieldName === "telephone"){
      setTelephone(value);
    }else if(fieldName === "subject"){
      setSubject(value);
    }else if(fieldName === "message"){
      setMessage(value);
    }
  }


  const contactSubmitHandler = (e) => {
    e.preventDefault();

    if(name.trim() === '' || email.trim() === '') {
      alert.error('Name and email is required');
    } else {
      try {
        setLoading(true)
        axios.post('/api/v1/contact/new', {
          name: name,
          email: email,
          company_name: companyname,
          telephone: telephone,
          subject: subject,
          message: message
        }).then(res => {
          setLoading(false)
          alert.success(res.data.message);
          setName('');
          setEmail('');
          setCompanyName('');
          setTelephone('');
          setSubject('');
          setMessage('');
        })
      } catch(e) {
        setLoading(false)
        alert.error(e.message);
      }
    }
  }
  return (
    <>
      <section className="banner-sec contact-banner">
            <img src="/images/contact-banner.jpg" alt=""/>
            <div className="container">
                <div className="banner-txt">
                    <h1>Contact</h1> 
                     <ul className="breadcrumb">
                          <li><Link to="/">Home</Link></li>
                          <li>Contact</li>
                     </ul>
                </div>
            </div>
        </section>
   <section className="contact-sec">
      <div className="container">
          <div className="contact-outr">
              <div className="row">
                  <div className="col-lg-7 col-sm-7">
                      <div className="contact-innr">
                          <p>Would you like to know where a Rebelcell dealer is located in your area, would you like to request a dealer information package, or do you have another question for us? You can contact us via the form below.</p>
                          <div className="contact-form">
                            <form onSubmit={(e) => contactSubmitHandler(e)}>
                              <div className="row">
                                <div className="col-lg-6 col-sm-6">
                                  <div className="from-grp">
                                    <input type="text" className="form-control" value={name} placeholder='Name' name="name" id="name" onChange={(e)=>{ onChangeHandler("name",e.target.value)}} />
                                  </div>
                                </div>

                                <div className="col-lg-6 col-sm-6">
                                  <div className="from-grp">
                                    <input type="text" className="form-control" value={companyname} placeholder='Company Name' name="companyname" onChange={(e)=>{ onChangeHandler("companyname",e.target.value)}} />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-sm-6">
                                  <div className="from-grp">
                                    <input type="email" className="form-control" value={email} placeholder='Email' name="email" onChange={(e)=>{ onChangeHandler("email",e.target.value)}} />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-sm-6">
                                  <div className="from-grp">
                                    <input type="tel" className="form-control" value={telephone} placeholder='Telephone Number' name="telephone" onChange={(e)=>{ onChangeHandler("telephone",e.target.value)}}/>
                                  </div>
                                </div>
                                <div className="col-lg-12 col-sm-12">
                                  <div className="from-grp">
                                    <input type="text" className="form-control" value={subject} placeholder='Subject/Topic' name="subject" onChange={(e)=>{ onChangeHandler("subject",e.target.value)}} />
                                  </div>
                                </div>
                                <div className="col-lg-12 col-sm-12">
                                  <div className="from-grp">
                                    <textarea className="form-control" value={message} placeholder='Message' name="message" onChange={(e)=>{ onChangeHandler("message",e.target.value)}} > </textarea>
                                  </div>
                                </div>
                              </div>
                              <div className="submit-bottom">
                                  <input type="submit" value={loading ? 'Sending...' : 'Send Message'} disabled={loading === true ? true : false}/>
                              </div>
                            </form>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-5 col-sm-5 con-info">
                      <div className="contact-innr">
                          <h3>Contact Info</h3>
                          <div className="contact-info">
                              <ul>
                                  <li>
                                      <div className="contact-img">
                                          <img src="/images/cont1.png" alt=""/>
                                      </div>
                                      <div className="contact-txt">
                                          <h4>Address</h4>
                                          <p>Vliegkamp Valkenburg - Building 377 
                                            <br />Wassenaarseweg 75 
                                            <br />2223 LA Katwijk (ZH) 
                                            <br />The Netherlands</p>
                                      </div>
                                  </li>
                                  <li>
                                      <div className="contact-img">
                                          <img src="/images/cont2.png" alt=""/>
                                      </div>
                                      <div className="contact-txt">
                                          <h4>Contact Number</h4>
                                          <p>Tel: <a href="tel:+31 (071) 7107424">+31 (071) 7107424</a></p>
                                      </div>
                                  </li>
                                  <li>
                                      <div className="contact-img">
                                          <img src="/images/cont3.png" alt=""/>
                                      </div>
                                      <div className="contact-txt">
                                          <h4>Email</h4>
                                          <p><a href="mailto:Contact@Rebel-Cell.com">Contact@Rebel-Cell.com</a></p>
                                      </div>
                                  </li>
                                  <li>
                                      <div className="contact-img">
                                          <img src="/images/cont4.png" alt=""/>
                                      </div>
                                      <div className="contact-txt">
                                          <h4>Facebook Messenger</h4>
                                          <p><a href="javascript:void(0)">Facebook.com/rebelcellnl</a></p>
                                      </div>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </section>
    </>
  )
}

export default Contact