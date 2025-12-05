
import LocationIconContact from "@/svg/contact_icon/LocationIconContact";

const GOOGLE_MAP_LINK = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d193502.96100813415!2d-74.1369342267891!3d40.729379535002856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1685268313256!5m2!1sen!2sbd";

type LocationType = {
    id: number;
    icon: JSX.Element;
    country: string;
    address: JSX.Element;
    address_link: string;
}

type GoogleMapContentType = {
    sub_title: string;
    title: string;
    locations: LocationType[];
}

const googleMapContent: GoogleMapContentType = {
    sub_title: "OUR OFFICES",
    title: "Visit one of our offices around the World",
    locations: [
        {
            id: 1, 
            icon: <LocationIconContact />,
            country: "United Kingdom",
            address: <>20 Great Marlborough Street, London, UK W18HU</>,
            address_link: "https://www.google.com/maps/@40.7293795,-74.1369342,11z?hl=en&entry=ttu",
        },
        {
            id: 2, 
            icon: <LocationIconContact />,
            country: "USA",
            address: <>208 Hamilton Avenue, Palo Alto, California, 901</>,
            address_link: "https://www.google.com/maps/@40.7293795,-74.1369342,11z?hl=en&entry=ttu",
        },
    ]
}

const {sub_title, title, locations} = googleMapContent;

const GoogleMapArea = () => {
    return (
        <section className="map-area pt-80 pb-80 mt-70 bg-light">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-6">
                        <div className="map-content-wrapper p-4">
                            <div className="map-header mb-4">
                                <span className="text-uppercase fw-bold text-primary d-block mb-2">{sub_title}</span>
                                <h3 className="map-title">{title}</h3>
                            </div>
                            
                            <div className="locations-list">
                                {locations.map((location, index) => (
                                    <div key={location.id} className={`location-item d-flex ${index !== locations.length - 1 ? 'mb-4' : ''}`}>
                                        <div className="location-icon me-3">
                                            {location.icon}
                                        </div>
                                        <div className="location-details">
                                            <h5 className="location-country mb-2">{location.country}</h5>
                                            <a 
                                                href={location.address_link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="location-address"
                                            >
                                                {location.address}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-6">
                        <div className="map-container h-100">
                            <iframe 
                                src={GOOGLE_MAP_LINK}
                                className="w-100 h-100 border-0"
                                style={{ minHeight: '400px' }}
                                title="Google Map"
                                loading="lazy"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GoogleMapArea;