import { Carousel } from "@material-tailwind/react";

export function CarouselDefault() {
  return (
    <Carousel className="mt-5 container rounded-xl">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/039/637/412/small/ai-generated-tea-plantation-green-landscape-in-the-mountains-photo.jpg"
        alt="image 1"
        className="h-5/6 w-full"
      />
      <img
        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="image 2"
        className="h-5/6 w-full "
      />
      <img
        src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
        alt="image 3"
        className="h-5/6 w-full "
      />
    </Carousel>
  );
}
