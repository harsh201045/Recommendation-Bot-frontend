import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { clampString } from "../../utils";



const ProductCard = ({ productData }) => {
    return (
        // <Card className="min-w-96 flex flex-col justify-center items-center">
        <Card className="min-w-96">
            {/* <CardHeader shadow={false} floated={false} className="h-[10rem]"> */}
            <CardHeader
                shadow={false}
                floated={false}
                className="flex justify-center"
                // style={{
                //     background: `url(${productData.imageURL || "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"}) cover no-repeat`,
                //     backgroundPosition: "center",
                //     backgroundSize: "cover"

                // }}
            >
                <img
                src={productData.imageURL || "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"}
                alt="card-image"
                className="h-[10rem]"
            />
            </CardHeader>

            <CardBody>
                <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium">
                        {clampString(productData.title, 50) || "Apple AirPods"}
                    </Typography>
                    <div>
                        <Typography color="blue-gray" className="font-bold text-2xl">
                            {("₹" + productData.price) || "$95.00"}
                        </Typography>
                        <div>
                            <Typography color="blue-gray" className="font-bold text-2xl">
                                {("₹" + productData.price) || "$95.00"}
                            </Typography>

                        </div>
                    </div>
                </div>
                {/* <Typography
                    variant="small"
                    color="gray"
                    className="font-normal opacity-75"
                >
                    With plenty of talk and listen time, voice-activated Siri access, and
                    an available wireless charging case.
                </Typography> */}
            </CardBody>
            <CardFooter className="pt-0">
                <Button
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    onClick={() => { window.open(productData.productURL, '_blank'); }}
                >
                    Buy Now
                </Button>
            </CardFooter>
        </Card>
    );
}

export default ProductCard;