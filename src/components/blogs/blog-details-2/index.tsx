
import React from 'react';
import HeaderFour from '@/layout/headers/HeaderFour';
import BreadcrumbElever from '@/components/common/breadcrumb/breadcrumb-11';
import FooterFour from '@/layout/footers/FooterFour';
import BlogDetailsTwoPostboxArea from './BlogDetailsTwoPostboxArea';
import BlogDetailsArticleArea from '../blog-details/BlogDetailsArticleArea';

const BlogDetailsTwo = () => {
	return (
		<>
			<HeaderFour />
			<main>
				<BreadcrumbElever />
				<BlogDetailsTwoPostboxArea />
				<BlogDetailsArticleArea />
			</main>
			<FooterFour />
		</>
	);
};

export default BlogDetailsTwo 