import { Suspense } from 'react';
import BlogDetails from '@/components/blogs/blog-details';
import ScrollToTop from '@/components/common/scroll-to-top';
import Wrapper from '@/layout/Wrapper';

export const metadata = {
    title: "Blog Details - SEO Marketing - The Most Advanced Traffic Generator",
};
const index = () => {
    return (
        <Wrapper>
            <Suspense fallback={
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: '60vh',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading blog details...</p>
                </div>
            }>
                <BlogDetails />
            </Suspense>
            <ScrollToTop />
        </Wrapper>
    );
};

export default index;