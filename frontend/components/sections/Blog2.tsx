'use client'
import Link from "next/link";
import { useMemo } from "react";

import { useGetSiteSettingByKeyQuery } from "@/integrations/hooks";
import { normalizeUiBlogSettingValue } from "@/integrations/shared";

export default function Blog2({ locale = 'en' }: { locale?: string }) {
    const safeLocale = locale || 'en';

    const { data: uiSetting } = useGetSiteSettingByKeyQuery({
        key: 'ui_blog',
        locale: safeLocale,
    });

    const ui = useMemo(
        () => normalizeUiBlogSettingValue(uiSetting?.value),
        [uiSetting?.value],
    );

    const cardDate = `${ui.blog2.sample_date} • ${ui.blog2.read_time}`;

    return (
        <>
            <section id="blog" className="section-blog-2 position-relative pt-60 pb-60">
                <div className="container">
                    <div className="text-center">
                        <div className="d-flex align-items-center justify-content-center">
                            <svg className="text-primary-2 me-2" xmlns="http://www.w3.org/2000/svg" width={5} height={6} viewBox="0 0 5 6" fill="none">
                                <circle cx="2.5" cy={3} r="2.5" fill="#A8FF53" />
                            </svg>
                            <span className="text-linear-4 d-flex align-items-center"> {ui.blog2.badge} </span>
                        </div>
                        <h3>{ui.blog2.heading}</h3>
                    </div>
                    <div className="row mt-8">
                        {/*prettier-ignore*/}
                        <div className="col-lg-4">
							<div className="blog-card rounded-top-2 mb-lg-3 mb-md-5 mb-3">
								<div className="blog-card__image position-relative">
									<div className="zoom-img rounded-2 overflow-hidden">
										<img className="w-100" src="assets/imgs/home-page-2/blog/img-1.png" alt="zelio" />
										<Link className="position-absolute bottom-0 start-0 m-3 text-white-keep border border-white fw-medium px-3 py-1 fs-7 bg-white rounded-2" href="#">{ui.blog2.card1_category}</Link>
										<Link href="#" className="blog-card__link position-absolute top-50 start-50 translate-middle icon-md icon-shape rounded-circle">
											<i className="ri-arrow-right-up-line" />
										</Link>
									</div>
								</div>
								<div className="blog-card__content position-relative text-center mt-4">
									<span className="blog-card__date fs-7">{cardDate}</span>
									<h6 className="blog-card__title mt-2">{ui.blog2.card1_title}</h6>
									<p className="blog-card__description fs-7">{ui.blog2.card1_description}</p>
									<Link href="#" className="link-overlay position-absolute top-0 start-0 w-100 h-100" />
								</div>
							</div>
						</div>
                        <div className="col-lg-4">
                            <div className="blog-card rounded-top-2 mb-lg-3 mb-md-5 mb-3">
                                <div className="blog-card__image position-relative">
                                    <div className="zoom-img rounded-2 overflow-hidden">
                                        <img className="w-100" src="assets/imgs/home-page-2/blog/img-2.png" alt="zelio" />
                                        <Link className="position-absolute bottom-0 start-0 m-3 text-white-keep border border-white fw-medium px-3 py-1 fs-7 bg-white rounded-2" href="#">
                                            {ui.blog2.card2_category}
                                        </Link>
                                        <Link href="#" className="blog-card__link position-absolute top-50 start-50 translate-middle icon-md icon-shape rounded-circle">
                                            <i className="ri-arrow-right-up-line" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="blog-card__content position-relative text-center mt-4">
                                    <span className="blog-card__date fs-7">{cardDate}</span>
                                    <h6 className="blog-card__title mt-2">{ui.blog2.card2_title}</h6>
                                    <p className="blog-card__description fs-7">{ui.blog2.card2_description}</p>
                                    <Link href="#" className="link-overlay position-absolute top-0 start-0 w-100 h-100" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="blog-card rounded-top-2 mb-lg-3 mb-md-5 mb-3">
                                <div className="blog-card__image position-relative">
                                    <div className="zoom-img rounded-2 overflow-hidden">
                                        <img className="w-100" src="assets/imgs/home-page-2/blog/img-3.png" alt="zelio" />
                                        <Link className="position-absolute bottom-0 start-0 m-3 text-white-keep border border-white fw-medium px-3 py-1 fs-7 bg-white rounded-2" href="#">
                                            {ui.blog2.card3_category}
                                        </Link>
                                        <Link href="#" className="blog-card__link position-absolute top-50 start-50 translate-middle icon-md icon-shape rounded-circle">
                                            <i className="ri-arrow-right-up-line" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="blog-card__content position-relative text-center mt-4">
                                    <span className="blog-card__date fs-7">{cardDate}</span>
                                    <h6 className="blog-card__title mt-2">{ui.blog2.card3_title}</h6>
                                    <p className="blog-card__description fs-7">{ui.blog2.card3_description}</p>
                                    <Link href="#" className="link-overlay position-absolute top-0 start-0 w-100 h-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
