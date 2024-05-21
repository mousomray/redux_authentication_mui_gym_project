import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            {/* <!-- Footer Start --> */}
            <div class="footer container-fluid mt-5 py-5 px-sm-3 px-md-5 text-white">
                <div class="row pt-5">
                    <div class="col-lg-3 col-md-6 mb-5">
                        <h4 class="text-primary mb-4">Get In Touch</h4>
                        <p><i class="fa fa-map-marker-alt mr-2"></i>15 SC Street, Uttarpara Hooghly</p>
                        <p><i class="fa fa-phone-alt mr-2"></i>+012 345 67890</p>
                        <p><i class="fa fa-envelope mr-2"></i>mousomray02@gmail.com</p>
                        <div class="d-flex justify-content-start mt-4">
                            <a class="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{ width: '40px', height: '40px' }} href="#"><i class="fab fa-twitter"></i></a>
                            <a class="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{ width: '40px', height: '40px' }} href="#"><i class="fab fa-facebook-f"></i></a>
                            <a class="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{ width: '40px', height: '40px' }} href="#"><i class="fab fa-linkedin-in"></i></a>
                            <a class="btn btn-outline-light rounded-circle text-center mr-2 px-0" style={{ width: '40px', height: '40px' }} href="#"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-5">
                        <h4 class="text-primary mb-4">Quick Links</h4>
                        <div class="d-flex flex-column justify-content-start">
                            <Link class="text-white mb-2" to="/"><i class="fa fa-angle-right mr-2"></i>Home</Link>
                            <Link class="text-white mb-2" to="/blog"><i class="fa fa-angle-right mr-2"></i>Blog</Link>
                            <Link class="text-white mb-2" to="/service"><i class="fa fa-angle-right mr-2"></i>Service</Link>
                            <Link class="text-white" to="/contact"><i class="fa fa-angle-right mr-2"></i>Contact</Link>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-5">
                        <h4 class="text-primary mb-4">Popular Links</h4>
                        <div class="d-flex flex-column justify-content-start">
                            <Link class="text-white mb-2" to="/"><i class="fa fa-angle-right mr-2"></i>Home</Link>
                            <Link class="text-white mb-2" to="/blog"><i class="fa fa-angle-right mr-2"></i>Blog</Link>
                            <Link class="text-white mb-2" to="/service"><i class="fa fa-angle-right mr-2"></i>Service</Link>
                            <Link class="text-white mb-2" to="/contact"><i class="fa fa-angle-right mr-2"></i>Contact</Link>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 mb-5">
                        <h4 class="text-primary mb-4">Opening Hours</h4>
                        <h5 class="text-white">Monday - Friday</h5>
                        <p>8.00 AM - 8.00 PM</p>
                        <h5 class="text-white">Saturday - Sunday</h5>
                        <p>2.00 PM - 8.00 PM</p>
                    </div>
                </div>
                <div class="container border-top border-dark pt-5">
                    <p class="m-0 text-center text-white">
                        &copy; <a class="text-white font-weight-bold" href="#">Corefit</a>. All Rights Reserved. Created by
                        <a class="text-white font-weight-bold" href="https://htmlcodex.com"> Mousom Ray</a>
                    </p>
                </div>
            </div>
            {/* <!-- Footer End --> */}
        </>
    )
}

export default Footer
