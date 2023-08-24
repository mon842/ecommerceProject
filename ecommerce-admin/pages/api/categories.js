import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === 'POST') {
    const { name,parentCategory } = req.body;

    const categoryDoc = await Category.create({ name, parent:parentCategory })
    res.json(categoryDoc);
  }

  if (method === 'GET') {
    res.json(await Category.find().populate('parent'));
    // if (req.query?.id) {
    //   res.json(await Category.findOne({ _id: req.query.id }));
    // }
    // else
    //   res.json(await Category.find());
  }

  if (method === 'PUT') {
    const { _id,name,parentCategory } = req.body;

    const categoryDoc = await Category.updateOne({_id},{ name, parent:parentCategory })
    res.json(categoryDoc);
  }

  if (method === 'DELETE') {
    const {_id} = req.query;
    await Category.deleteOne({_id});
    res.json('ok');
  }
}

