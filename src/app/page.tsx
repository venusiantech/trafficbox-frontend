import HomeOne from "@/components/homes/home-4";
import ScrollToTop from "@/components/common/scroll-to-top";
import Wrapper from "@/layout/Wrapper";
import Script from "next/script";

export const metadata = {
  title: "Trafficboxes.com - Digital Marketing & SEO Agency", 
};
const index = () => {
  return (
    <Wrapper> 
       <HomeOne />
       <ScrollToTop style={false} />
       <Script
         id="tawk-to-script"
         strategy="afterInteractive"
         dangerouslySetInnerHTML={{
           __html: `
             var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
             (function(){
               var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
               s1.async=true;
               s1.src='https://embed.tawk.to/69623e3da17050197cae77b0/1jejs68pc';
               s1.charset='UTF-8';
               s1.setAttribute('crossorigin','*');
               s0.parentNode.insertBefore(s1,s0);
             })();
           `,
         }}
       />
    </Wrapper>
  );
};

export default index;