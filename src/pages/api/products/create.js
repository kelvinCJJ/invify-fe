import { BingChat } from 'bing-chat'

export default async function create(req, res) {
  
  const api = new BingChat({
    cookie: process.env.BING_COOKIE,
  })
  const resp = await api.sendMessage(req.body.inputs, {variant: "Precise"})
  res.status(200).json({generated_text: resp.text })
}