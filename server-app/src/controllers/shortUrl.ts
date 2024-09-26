import Express from "express";
import { urlModel } from "../model/shortUrl";

export const createUrl = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    console.log("the fullUrl is", req.body.fullUrl);
    const { fullUrl } = req.body;
    const urlFound = await urlModel.find({ fullUrl });
    if (urlFound.length > 0) {
      res.status(409).send(urlFound);
    } else {
      const shortUrl = await urlModel.create({ fullUrl });
      res.status(201).send(shortUrl);
    }
  } catch (error) {
    res.status(500).send({ message: "something went wrong" });
  }
};

export const getAllUrl = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const shortUrls = await urlModel.find().sort({ createdAt: -1 });
    if (shortUrls.length < 0) {
      res.status(404).send({ message: "short Urls not found" });
    } else {
      res.status(200).send(shortUrls);
    }
  } catch (error) {
    res.status(500).send({ message: "something went wrong" });
  }
};

export const getUrl = async (req: Express.Request, res: Express.Response) => {
  try {
    const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
    if (!shortUrl) {
      res.status(404).send({ message: "full url not found" });
    } else {
      shortUrl.clicks++;
      shortUrl.save();
      res.redirect(`${shortUrl.fullUrl}`);
    }
  } catch (error) {
    res.status(500).send({ message: "something went wrong" });
  }
};

export const deleteUrl = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const shortUrl = await urlModel.findByIdAndDelete({
      _id: req.params.id,
    });
    if (shortUrl) {
      res.status(200).send({ message: "requested url successfully deleted" });
    }
  } catch (error) {
    res.status(500).send({ message: "something went wrong" });
  }
};
