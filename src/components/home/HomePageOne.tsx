/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
// react
import {
    Fragment,
    useMemo,
    useState,
} from 'react';

// third-party
import Head from 'next/head';

// application
// import shopApi from '../../api/shop';
import { IProduct } from '../../interfaces/product';
// import { useDeferredData } from '../../services/hooks';
// import { useDeferredData, useProductColumns, useProductTabs } from '../../services/hooks';

// blocks
import BlockBanner from '../blocks/BlockBanner';
import BlockBrands from '../blocks/BlockBrands';
import BlockCategories from '../blocks/BlockCategories';
import BlockFeatures from '../blocks/BlockFeatures';
import BlockPosts from '../blocks/BlockPosts';
import { BlockProductColumnsItem } from '../blocks/BlockProductColumns';
// import BlockProductColumns, { BlockProductColumnsItem } from '../blocks/BlockProductColumns';
import BlockProducts from '../blocks/BlockProducts';
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';
import BlockSlideShow from '../blocks/BlockSlideShow';

// data stubs
// import dataBlogPosts from '../../data/blogPosts';
// import dataShopBlockCategories from '../../data/shopBlockCategories';
import HomeBlock from '../../models/home';
import Post from '../../models/post';
import { IConfigState } from '../../store/config/configType';
import { GetHomeBlock, GetPostHome } from '../../repository/home';

export interface InitData {
    featuredProducts?: IProduct[];
    bestsellers?: IProduct[];
    latestProducts?: IProduct[];
    productColumns?: BlockProductColumnsItem[];
}

export interface HomePageOneProps {
    // initData?: InitData;
    configState: IConfigState | null;
}

function HomePageOne(props: HomePageOneProps) {
    const { configState } = props;
    const [homeBlock, setHomeBlock] = useState<HomeBlock>(new HomeBlock());
    const [postHome, setPostHome] = useState<Post[]>([]);

    /**
     * Featured products.
     */
    // const featuredProducts = useProductTabs(
    //     useMemo(() => [
    //         { id: 1, name: 'All', categorySlug: undefined },
    //         { id: 2, name: 'Power Tools', categorySlug: 'power-tools' },
    //         { id: 3, name: 'Hand Tools', categorySlug: 'hand-tools' },
    //         { id: 4, name: 'Plumbing', categorySlug: 'plumbing' },
    //     ], []),
    //     (tab) => shopApi.getPopularProducts({ limit: 8, category: tab.categorySlug }),
    //     initData?.featuredProducts,
    // );
    useMemo(() => {
        async function fetch() {
            const response: HomeBlock | null = await GetHomeBlock();
            if (response != null) {
                setHomeBlock(response);
            }
        }
        fetch();
    }, []);

    useMemo(() => {
        async function fetch() {
            const response: Post[] = await GetPostHome();
            setPostHome(response);
        }
        fetch();
    }, []);

    /**
     * Bestsellers.
     */
    // const bestsellers = useDeferredData(() => (
    //     shopApi.getPopularProducts({ limit: 7 })
    // ), [], initData?.bestsellers);

    /**
     * Latest products.
     */
    // const latestProducts = useProductTabs(
    //     useMemo(() => [
    //         { id: 1, name: 'All', categorySlug: undefined },
    //         { id: 2, name: 'Power Tools', categorySlug: 'power-tools' },
    //         { id: 3, name: 'Hand Tools', categorySlug: 'hand-tools' },
    //         { id: 4, name: 'Plumbing', categorySlug: 'plumbing' },
    //     ], []),
    //     (tab) => shopApi.getLatestProducts({ limit: 8, category: tab.categorySlug }),
    //     initData?.latestProducts,
    // );

    /**
     * Product columns.
     */
    // const columns = initData?.productColumns || useProductColumns(
    //     useMemo(() => [
    //         {
    //             title: 'Top Rated Products',
    //             source: () => shopApi.getTopRatedProducts({ limit: 3 }),
    //         },
    //         {
    //             title: 'Special Offers',
    //             source: () => shopApi.getDiscountedProducts({ limit: 3 }),
    //         },
    //         {
    //             title: 'Bestsellers',
    //             source: () => shopApi.getPopularProducts({ limit: 3 }),
    //         },
    //     ], []),
    // );

    return (
        <Fragment>
            <Head>
                <title>Kim Tu???n H??ng</title>
                <meta name="title" content="Kim Tu???n H??ng" />
                <meta name="title" content="C??p X??ch Kim Tu???n H??ng" />
                <meta
                    name="description"
                    content="C??ng Ty TNHH TM-DV C??p X??ch Kim Tu???n H??ng l?? C??ng ty chuy??n s???n xu???t, cung c???p c??c lo???i D??y c??p th??p, ph??n ph???i c??c thi???t b??? n??ng h??? v?? d???ng c??? h??? tr???. Ch??ng t??i c?? h??n 10 n??m kinh nghi???m trong l??nh v???c n??y."
                />
                <meta name="keywords" content="C??p X??ch Kim Tu???n H??ng" />

                {/* FaceBook */}
                <meta property="og:title" content="C??p X??ch Kim Tu???n H??ng" />
                <meta property="og:type" content="article" />
                <meta property="og:url" content="https://capxichkimtuanhung.com/" />
                <meta
                    property="og:description"
                    content="C??ng Ty TNHH TM-DV C??p X??ch Kim Tu???n H??ng l?? C??ng ty chuy??n s???n xu???t, cung c???p c??c lo???i D??y c??p th??p, ph??n ph???i c??c thi???t b??? n??ng h??? v?? d???ng c??? h??? tr???. Ch??ng t??i c?? h??n 10 n??m kinh nghi???m trong l??nh v???c n??y."
                />
                <meta property="og:image" content="https://capxichkimtuanhung.com/images/system/LogoCompany.png" />
            </Head>

            {useMemo(() => <BlockSlideShow withDepartments />, [])}

            {useMemo(() => <BlockFeatures />, [])}

            {
                useMemo(() => {
                    if (homeBlock.featured_products
                        && homeBlock.featured_products.length > 0) {
                        return (
                            <BlockProductsCarousel
                                title="S???n Ph???m N???i B???t"
                                layout="grid-4"
                                products={homeBlock.featured_products}
                            />
                        );
                    }
                }, [homeBlock.featured_products])
            }

            {useMemo(() => <BlockBanner />, [])}

            {
                useMemo(() => {
                    if (homeBlock.bestsellers_products
                        && homeBlock.bestsellers_products.length > 0) {
                        return (
                            <BlockProducts
                                title="S???n Ph???m B??n Ch???y"
                                layout="large-first"
                                featuredProduct={homeBlock.bestsellers_products[0]}
                                products={homeBlock.bestsellers_products}
                            />
                        );
                    }
                }, [homeBlock.bestsellers_products])
            }

            {
                useMemo(() => {
                    if (homeBlock.category_popular
                        && homeBlock.category_popular.length > 0) {
                        return (
                            <BlockCategories
                                title="Ng??nh h??ng ph??? bi???n"
                                layout="classic"
                                categories={homeBlock.category_popular}
                            />
                        );
                    }
                }, [homeBlock.category_popular])
            }

            {/* {useMemo(() => (
                <BlockProductsCarousel
                    title="New Arrivals"
                    layout="horizontal"
                    rows={2}
                    products={latestProducts.data}
                    loading={latestProducts.isLoading}
                    groups={latestProducts.tabs}
                    onGroupClick={latestProducts.handleTabChange}
                />
            ), [latestProducts])} */}

            {/* {useMemo(() => <BlockPosts title="Latest News" layout="list-sm" posts={dataBlogPosts} />, [])} */}
            {useMemo(() => <BlockPosts title="Tin M???i" layout="list-sm" posts={postHome} />, [postHome])}

            {useMemo(() => <BlockBrands />, [])}

            {/* {useMemo(() => <BlockProductColumns columns={columns} />, [columns])} */}
        </Fragment>
    );
}

export default HomePageOne;
