

"use client";
// frontend/components/sections/Projects1.tsx
import Link from "next/link";
import { useMemo } from "react";

import { useGetSiteSettingByKeyQuery } from "@/integrations/hooks";
import { normalizeUiProjectSettingValue } from "@/integrations/shared";
import PortfolioFilter from "../elements/PortfolioFilter";

export default function Projects1({ locale }: { locale: string }) {
    const { data: uiSetting } = useGetSiteSettingByKeyQuery({
        key: "ui_project",
        locale,
    });

    const ui = useMemo(
        () => normalizeUiProjectSettingValue(uiSetting?.value),
        [uiSetting?.value],
    );

    return (
        <>
            <div id="projects" className="section-projects-1 position-relative pt-120 pb-6 bg-900">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-lg-7 me-auto">
                            <h3 className="ds-3 mt-3 mb-3 text-primary-1">{ui.projects1.heading}</h3>
                            <span
                                className="fs-5 fw-medium text-200"
                                dangerouslySetInnerHTML={{ __html: ui.projects1.intro_html }}
                            />
                        </div>
                        <div className="col-lg-auto">
                            <Link
                                href={`/${locale}/work`}
                                className="btn btn-gradient mt-lg-0 mt-5 ms-lg-auto d-none d-xl-block"
                            >
                                {ui.projects1.cta_label}
                                <i className="ri-arrow-right-up-line" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-900 fillter-project" data-background="/assets/imgs/projects/projects-1/background.png">
                <PortfolioFilter />
            </div>
            <div className="contairer overflow-hidden">
                <div className="row justify-content-center position-relative button-project pb-160 bg-900 pt-1">
                    <Link
                        href={`/${locale}/work`}
                        className="icon_hover position-relative z-1 icon-shape icon_150 border-linear-2 rounded-circle position-relative overflow-hidden bg-white hover-up"
                    >
                        <span className="icon-shape icon-md bg-linear-2 rounded-circle position-absolute bottom-0 end-0" />
                        <p className="m-0 fs-7 fw-bold text-capitalize position-absolute top-50 start-50 translate-middle">
                            {ui.projects1.cta_short_label}
                            <i className="ri-arrow-right-up-line fs-7" />
                        </p>
                    </Link>
                    <div className="ellipse position-absolute bottom-0 start-50 translate-middle-x z-0" />
                </div>
            </div>
        </>
    );
}
