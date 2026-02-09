// ---------------------------------------------------------------------
// FILE: frontend/app/[locale]/work/_component/WorkSingle.client.tsx
// FINAL — WorkSingle (RTK), slug from params
// FIX: uses Project type + normalizeProjectDetail from types (single source)
// ---------------------------------------------------------------------
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import {
  useGetProjectBySlugPublicQuery,
  useGetSiteSettingByKeyQuery,
  useListProjectImagesPublicQuery,
} from '@/integrations/hooks';

import type { Project, ProjectImage } from '@/integrations/shared';
import { normalizeProjectDetail, normalizeUiProjectSettingValue } from '@/integrations/shared';

export default function WorkSingleClient({ locale }: { locale: string }) {
  const params = useParams<{ slug?: string; locale?: string }>();
  const slug = (params?.slug ?? '').trim();

  const { data: uiSetting } = useGetSiteSettingByKeyQuery({
    key: 'ui_project',
    locale,
  });

  const ui = useMemo(() => normalizeUiProjectSettingValue(uiSetting?.value), [uiSetting?.value]);
  const copy = ui.detail;

  const {
    data: detailRaw,
    isLoading: isDetailLoading,
    error: detailError,
  } = useGetProjectBySlugPublicQuery({ slug, include: 'images' } as any, { skip: !slug });

  const detail = useMemo(() => {
    if (!detailRaw) return null;
    return normalizeProjectDetail(detailRaw as Project);
  }, [detailRaw]);

  const projectId = detail?.id ?? '';
  const { data: images, isLoading: isImagesLoading } = useListProjectImagesPublicQuery(
    projectId as any,
    { skip: !projectId },
  );

  const gallery = useMemo(() => {
    const fromImagesEndpoint = (Array.isArray(images) ? images : []) as ProjectImage[];
    const fromDetail = Array.isArray((detailRaw as any)?.images)
      ? ((detailRaw as any).images as any[] as ProjectImage[])
      : [];
    return fromImagesEndpoint.length ? fromImagesEndpoint : fromDetail;
  }, [images, detailRaw]);

  if (isDetailLoading) {
    return (
      <section className="section-work-single section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-lg-auto">
              <div className="text-center">
                <h3 className="ds-3 mt-3 mb-4 text-dark">{copy.loading}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (detailError || !detail) {
    const slugLine = slug ? `${copy.slug_prefix} ${slug}` : copy.slug_missing;

    return (
      <section className="section-work-single section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-lg-auto">
              <div className="text-center">
                <h3 className="ds-3 mt-3 mb-3 text-dark">{copy.not_found}</h3>
                <p className="text-300 mb-0">{slugLine}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="section-work-single section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-lg-auto mb-lg-0">
              <div className="text-center">
                <Link href="#" className="btn btn-gradient d-inline-block text-uppercase">
                  {copy.badge}
                </Link>

                <h3 className="ds-3 mt-3 mb-4 text-dark">{detail.title}</h3>

                {detail.summaryTop ? (
                  <p className="text-300 fs-5 mb-0">{detail.summaryTop}</p>
                ) : (
                  <p className="text-300 fs-5 mb-0" />
                )}
              </div>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-4 py-8">
              <div className="bg-6 px-5 py-3 rounded-2">
                <p className="text-300 mb-0">{copy.label_client}</p>
                <h6>{detail.client}</h6>
              </div>

              <div className="bg-6 px-5 py-3 rounded-2">
                <p className="text-300 mb-0">{copy.label_start}</p>
                <h6>{detail.startPretty}</h6>
              </div>

              <div className="bg-6 px-5 py-3 rounded-2">
                <p className="text-300 mb-0">{copy.label_complete}</p>
                <h6>{detail.completePretty}</h6>
              </div>

              <div className="bg-6 px-5 py-3 rounded-2">
                <p className="text-300 mb-0">{copy.label_services}</p>
                <h6>{detail.servicesArr.join(', ')}</h6>
              </div>

              <div className="bg-6 px-5 py-3 rounded-2">
                <p className="text-300 mb-0">{copy.label_website}</p>
                <h6>{detail.website}</h6>
              </div>
            </div>

            <img src={detail.cover} alt={detail.coverAlt} />

            <div className="col-lg-8 mx-lg-auto mt-8">
              <h5 className="fs-5 fw-medium">{copy.description_label}</h5>
              <p className="text-300">{detail.descriptionText}</p>

              {detail.toolsArr.length > 0 ? (
                <>
                  <h5 className="fs-5 fw-medium mt-4">{copy.tools_label}</h5>
                  <p className="text-300 mb-0">{detail.toolsArr.join(', ')}</p>
                </>
              ) : null}

              {detail.content.key_features.length > 0 ? (
                <>
                  <h5 className="fs-5 fw-medium mt-4">{copy.key_features_label}</h5>
                  <ul>
                    {detail.content.key_features.map((t, i) => (
                      <li key={i}>
                        <p className="text-dark fw-bold">
                          <span className="text-300 fw-medium">{t}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {detail.content.technologies_used.length > 0 ? (
                <>
                  <h5 className="fs-5 fw-medium mt-4">{copy.technologies_used_label}</h5>
                  <ul>
                    {detail.content.technologies_used.map((t, i) => (
                      <li key={i}>
                        <p className="text-dark fw-bold">
                          <span className="text-300 fw-medium">{t}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {detail.content.design_highlights.length > 0 ? (
                <>
                  <h5 className="fs-5 fw-medium mt-4">{copy.design_highlights_label}</h5>
                  <ul>
                    {detail.content.design_highlights.map((t, i) => (
                      <li key={i}>
                        <p className="text-dark fw-bold">
                          <span className="text-300 fw-medium">{t}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {/* Template’de içerik buradan bekleniyor olabilir -> bas */}
              {detail.content.html ? (
                <>
                  <h5 className="fs-5 fw-medium mt-4">{copy.details_label}</h5>
                  <div
                    className="text-300"
                    dangerouslySetInnerHTML={{ __html: detail.content.html }}
                  />
                </>
              ) : null}

              {isImagesLoading ? null : gallery.length > 0 ? (
                <>
                  <h5 className="fs-5 fw-medium mt-4">{copy.gallery_label}</h5>
                  <div className="row g-3">
                    {gallery.map((img) => (
                      <div className="col-md-4" key={img.id}>
                        <img
                          src={img.image_url ?? detail.cover}
                          alt={(img.alt ?? detail.title) as any}
                          style={{ width: '100%', height: 'auto', borderRadius: 12 }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Static 1 + Contact bloklarını burada aynen tutabilirsin */}
    </div>
  );
}
