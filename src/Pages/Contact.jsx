import React, { useState } from 'react'
import Layout from '../Common/Layout'
import Loader2 from '../Common/Loader2'
import ContactsIcon from '@mui/icons-material/Contacts';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { toast } from 'react-toastify'


const initialstate = {
    name: '',
    email: '',
    phone: '',
    message: ''
}

const Contact = () => {

    const [contact, setContact] = useState(initialstate)
    const [error, setError] = useState({});

    const [loading, setLoading] = useState(false);

    const validation = () => {
        let error = {}

        // Validation for Name
        if (!contact.name) {
            error.name = "Name is Required"
        } else if (contact.name.length < 3) {
            error.name = "Name mustbe atleast 3 characters"
        }

        // Validation for Email 
        if (!contact.email) {
            error.email = "Email is Required"
        } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(contact.email)) {
            error.email = "Email Should be abc@gmail.com pattern"
        }

        // Validation For Phone 
        if (!contact.phone) {
            error.phone = "Phone is Required"
        } else if (contact.phone.length !== 10) {
            error.phone = "Phone number must be 10 characters"
        }

        // Validation for Message 
        if (!contact.message) {
            error.message = "Please Enter Message"
        }

        return error

    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setContact({ ...contact, [name]: value })

        // Validation For Name 
        if (name === 'name') {
            if (value.length === 0) {
                setError({ ...error, name: 'Name is Required' })
                setContact({ ...contact, name: '' })
            } else {
                setError({ ...error, name: '' })
                setContact({ ...contact, name: value })
            }
        }

        // Validation For Email 
        if (name === 'email') {
            if (value.length === 0) {
                setError({ ...error, email: 'Email is Required' })
                setContact({ ...contact, email: '' })
            } else {
                setError({ ...error, email: '' })
                setContact({ ...contact, email: value })
            }
        }

        // Validation For Phone 
        if (name === 'phone') {
            if (value.length === 0) {
                setError({ ...error, phone: 'Phone is Required' })
                setContact({ ...contact, phone: '' })
            } else {
                setError({ ...error, phone: '' })
                setContact({ ...contact, phone: value })
            }
        }

        // Validation For Message 
        if (name === 'message') {
            if (value.length === 0) {
                setError({ ...error, message: 'Message is Required' })
                setContact({ ...contact, message: '' })
            } else {
                setError({ ...error, message: '' })
                setContact({ ...contact, message: value })
            }
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        let ErrorList = validation()
        setError(validation())

        if (Object.keys(ErrorList).length === 0) {
            try {
                const apiurl = 'https://restapinodejs.onrender.com/api/contact/create'

                // const mytoken = {
                //   headers: {
                //     "x-access-token": auth.token,
                //   },
                // };

                const response = await axios.post(apiurl, contact)
                if (response && response?.data?.success === true) {
                    console.log("Contact Data is Fetching", response);
                    toast.success(response?.data?.message)
                    setLoading(false);
                    setContact(initialstate)
                } else {
                    console.log("Error Fetching Contact Data", response);
                    toast.error(response?.data?.message)
                    setLoading(false)
                }

            } catch (error) {
                console.log("Error Fetching Contact Data", error);
                toast.error(error?.response?.data?.message)
                setLoading(false)
            }
        } else {
            setLoading(false)
        }

    }

    return (
        <>

            <Layout>
                {/*Start Contact section*/}
                <div class="map-section">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58906.14545488164!2d88.28142013124996!3d22.667427400000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89ce68e7cfa39%3A0xecc5dd803484eae5!2sUttarpara%20Co-operative%20Bank!5e0!3m2!1sen!2sin!4v1712406400333!5m2!1sen!2sin" frameborder="0" style={{ border: '0', width: '100%', height: '350px' }} allowfullscreen></iframe>
                </div>

                <section id="contact" class="contact">
                    <div class="container">

                        <div class="row justify-content-center" data-aos="fade-up">

                            <div class="col-lg-10">

                                <div class="info-wrap">
                                    <div class="row">
                                        <div class="col-lg-4 info">
                                            <i class="icofont-google-map"></i>
                                            <h4>Location:</h4>
                                            <p>15 SC Street<br />Uttarpara hooghly</p>
                                        </div>

                                        <div class="col-lg-4 info mt-4 mt-lg-0">
                                            <i class="icofont-envelope"></i>
                                            <h4>Email:</h4>
                                            <p>mousom@gmail.com<br />mousomray02@gmail.com</p>
                                        </div>

                                        <div class="col-lg-4 info mt-4 mt-lg-0">
                                            <i class="icofont-phone"></i>
                                            <h4>Call:</h4>
                                            <p>+9903419235<br />+033-26643827</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <Grid container justifyContent="center" mt={5} data-aos="fade-up" sx={{ boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)', border: '1px solid #E31C25',}}>

                            <Grid item xs={12} lg={10}>
                                <form onSubmit={handleOnSubmit} style={{ padding: '20px' }}>
                                    <Typography variant="h5" align="center" gutterBottom>
                                        Contact Us
                                    </Typography>
                                    <div style={{ marginBottom: '15px' }}>
                                        <TextField
                                            fullWidth
                                            label="Your Name"
                                            variant="outlined"
                                            name="name"
                                            value={contact.name}
                                            onChange={handleOnChange}
                                            error={!!error.name}
                                            helperText={error.name}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <TextField
                                            fullWidth
                                            label="Your Email"
                                            variant="outlined"
                                            name="email"
                                            value={contact.email}
                                            onChange={handleOnChange}
                                            error={!!error.email}
                                            helperText={error.email}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <TextField
                                            fullWidth
                                            label="Phone"
                                            variant="outlined"
                                            name="phone"
                                            type="number"
                                            value={contact.phone}
                                            onChange={handleOnChange}
                                            error={!!error.phone}
                                            helperText={error.phone}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <TextField
                                            fullWidth
                                            label="Message"
                                            variant="outlined"
                                            name="message"
                                            multiline
                                            rows={5}
                                            value={contact.message}
                                            onChange={handleOnChange}
                                            error={!!error.message}
                                            helperText={error.message}
                                        />
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Button type="submit" variant="contained" color="primary">
                                            {loading ? <Loader2/> : 'Submit'}
                                        </Button>
                                    </div>
                                </form>
                            </Grid>
                        </Grid>

                    </div>
                </section>
                {/*End Contact section*/}
            </Layout>

        </>
    )
}

export default Contact