import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const configurationString = searchParams.get("configuration") || "";
    const configuration = JSON.parse(configurationString);
    const width = 400;
    const height = 200;
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

    const imageBuffer = await chartJSNodeCanvas.renderToBuffer(configuration);

    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "Error while generating chart: " + error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
