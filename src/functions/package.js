import axios from 'axios';


export const createPackage = async (packageprod, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/package`, packageprod, {
        headers: {
            authtoken,
        },
    });

export const getPackagesByCount = async (count) =>
    await axios.get(`${process.env.REACT_APP_API}/packages/${count}`);

export const removePackage = async (slug, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/package/${slug}`, {
        headers: {
            authtoken,
        },
    });

export const getPackage = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/package/${slug}`);

export const updatePackage = async (slug, packageprod, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/package/${slug}`, packageprod, {
        headers: {
            authtoken,
        },
    });

export const getPackages = async (sort, order, page) =>
    await axios.post(`${process.env.REACT_APP_API}/packages`,
        {
            sort,
            order,
            page,
        },
    );

export const getPackagesCount = async () =>
    await axios.get(`${process.env.REACT_APP_API}/packages/total`);


export const packageStar = async (packageId, star, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/package/star/${packageId}`,
        { star },
        {
            headers: {
                authtoken,
            },
        });

export const getRelated = async (packageId) =>
    await axios.get(`${process.env.REACT_APP_API}/package/related/${packageId}`);

export const fetchPackagesFilter = async (arg) =>
    await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
