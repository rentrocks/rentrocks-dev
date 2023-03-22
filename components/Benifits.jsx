const Content = [
    {
        ID: 1,
        title: "Express Delivery",
        bgImg: 'https://zishop.vercel.app/_next/image?url=%2Fimages%2Fbenefit-icons%2F005-delivery-truck-2.webp&w=96&q=75'
    },
    {
        ID: 1,
        title: "Payment on the Spot",
        bgImg: 'https://zishop.vercel.app/_next/image?url=%2Fimages%2Fbenefit-icons%2F003-cash-on-delivery.webp&w=96&q=75'
    },
    {
        ID: 1,
        title: "Guarantee the originality",
        bgImg: 'https://zishop.vercel.app/_next/image?url=%2Fimages%2Fbenefit-icons%2F006-best-seller.webp&w=96&q=75'
    },
    {
        ID: 1,
        title: "24/7 support",
        bgImg: 'https://zishop.vercel.app/_next/image?url=%2Fimages%2Fbenefit-icons%2F004-headphones.webp&w=96&q=75',
    },
];
const Benifits = () => {
    return (
        <div className="grid gap-4 grid-cols-12 my-8 pt-4 mx-auto">
            {Content.map((e) => {
                return <div className="col-span-6 lg:col-span-3 flex flex-col items-center">
                    <img alt="" src={e.bgImg} />
                    <p className="py-2 text-sm md:text-base text-palette-base/90 text-center">
                        {e.title}
                    </p>
                </div>
            })}
        </div>
    )
}

export default Benifits