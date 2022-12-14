/* eslint-disable @typescript-eslint/no-unused-vars */
// react
import { Fragment, useEffect, useState } from 'react';

// third-party
import Head from 'next/head';

// application
import BlogPost from './BlogPost';
import BlogSidebar from './BlogSidebar';
import PageHeader from '../shared/PageHeader';

// data stubs
// import { GetPostDetail } from '../../api/Menu/postApi';
import Post from '../../models/post';
import { IMAGE_FOLDER } from '../../environment';

export type BlogPagePostLayout = 'classic' | 'full';

export type BlogPagePostSidebarPosition = 'start' | 'end';

export interface BlogPagePostProps {
    layout?: BlogPagePostLayout;
    sidebarPosition?: BlogPagePostSidebarPosition;
    postSlug: string;
    postDetail: Post;
    currentUrl: string;
}

export default function TemplatePost(props: BlogPagePostProps) {
    const {
        layout = 'classic',
        sidebarPosition = 'end',
        postSlug,
        postDetail,
        currentUrl,
    } = props;
    // const [currentUrl, setCurrentUrl] = useState('');

    let content;
    if (layout === 'classic') {
        const sidebar = <BlogSidebar position={sidebarPosition} />;

        let sidebarStart;
        let sidebarEnd;

        if (sidebarPosition === 'start') {
            sidebarStart = <div className="col-12 col-lg-4 order-1 order-lg-0">{sidebar}</div>;
        }
        if (sidebarPosition === 'end') {
            sidebarEnd = <div className="col-12 col-lg-4">{sidebar}</div>;
        }

        content = (
            <div className="row">
                {sidebarStart}
                <div className="col-12 col-lg-8">
                    <BlogPost layout={layout} post={postDetail} />
                </div>
                {sidebarEnd}
            </div>
        );
    } else if (layout === 'full') {
        content = (
            <div className="row justify-content-center">
                <div className="col-md-12 col-lg-9 col-xl-8">
                    <BlogPost layout={layout} post={postDetail} />
                </div>
            </div>
        );
    }

    const breadcrumbs = [
        { title: 'Trang Ch???', url: '/' },
        { title: postDetail.menu_name, url: postDetail.menu_slug },
        { title: postDetail.title, url: '' },
    ];

    return (
        <Fragment>
            <Head>
                <title>{`${postDetail.title} | C??p X??ch Kim Tu???n H??ng`}</title>
                <meta name="title" content={`${postDetail.title} - Kim Tu???n H??ng`} />
                <meta name="description" content={postDetail.short_descriptions} />
                <meta name="image" content={IMAGE_FOLDER + postDetail.thumbnail} />
                <meta name="keywords" content={`C??p x??ch Kim Tu???n H??ng, Kim Tu???n H??ng, ${postDetail.title}`} />
                <meta name="author" content="C??NG TY TNHH TM-DV C??P X??CH KIM TU???N H??NG" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:title" content={`${postDetail.title} - Kim Tu???n H??ng`} />
                <meta property="og:description" content={postDetail.short_descriptions} />
                <meta property="og:image" content={IMAGE_FOLDER + postDetail.thumbnail} />
                <link rel="amphtml" href={currentUrl} />
                <link rel="canonical" href={currentUrl} />
            </Head>

            <PageHeader breadcrumb={breadcrumbs} />

            <div className="container">{content}</div>
        </Fragment>
    );
}
