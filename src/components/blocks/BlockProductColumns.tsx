// application
import BlockHeader from '../shared/BlockHeader';
import ProductCard from '../shared/ProductCard';
import Products from '../../models/product';

export interface BlockProductColumnsItem {
    title: string;
    products: Products[];
}

export interface BlockProductColumnsProps {
    columns?: BlockProductColumnsItem[];
}

function BlockProductColumns(props: BlockProductColumnsProps) {
    const { columns = [] } = props;

    const columnsList = columns.map((column, index) => {
        const products = column.products.map((product) => (
            <div key={product.product_id} className="block-product-columns__item">
                <ProductCard product={product} layout="horizontal" />
            </div>
        ));

        return (
            <div key={index} className="col">
                <BlockHeader title={column.title} />

                <div className="block-product-columns__column">
                    {products}
                </div>
            </div>
        );
    });

    return (
        <div className="block block-product-columns d-lg-block d-none">
            <div className="container">
                <div className="row">
                    {columnsList}
                </div>
            </div>
        </div>
    );
}

export default BlockProductColumns;
