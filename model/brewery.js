module.exports = class Brewery {

    constructor(
        id, name, brewery_type, street, city, state,
        postal_code, country, longitude, latitude,
        phone, website_url, updated_at, tag_list = []
    ) {
        this.id = id;
        this.name = name;
        this.brewery_type = brewery_type;
        this.street = street;
        this.city = city;
        this.state = state;
        this.postal_code = postal_code;
        this.country = country;
        this.longitude = longitude;
        this.latitude = latitude;
        this.phone = phone;
        this.website_url = website_url;
        this.updated_at = updated_at;
        this.tag_list = tag_list;
    }

    getFullAddress() {
        return new FullAddress(
            this.postal_code, this.country,
            this.state, this.city, this.street
        );
    }

    static from(json) {
        return Object.assign(new Brewery(), json);
    }
};

class FullAddress {
    constructor(postal_code, country, state, city, street) {
        this.postal_code = postal_code;
        this.country = country;
        this.state = state;
        this.city = city;
        this.street = street;
    }
}