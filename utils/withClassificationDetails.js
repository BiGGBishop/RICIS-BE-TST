const { Classification, Categories, SubCategories } = require('../sequelize/models');

const withClassificationDetails = async (auth) => {
  if (!auth) return null;

  const result = auth.toJSON ? auth.toJSON() : auth;

  // Parse incidentalIds string like '{"216","215"}'
  let incidentalIds = [];
  if (result.incidentalIds && typeof result.incidentalIds === 'string') {
    incidentalIds = result.incidentalIds
      .replace(/[{}"]/g, '')
      .split(',')
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));
  }

  const incidentalClassifications =
    incidentalIds.length > 0
      ? await Classification.findAll({
          where: { id: incidentalIds },
          attributes: ['id', 'classification_name'],
        })
      : [];

  // Load associations manually if not eager-loaded
  const [classification, category, subcategory] = await Promise.all([
    result.classification || Classification.findByPk(result.classificationId, { attributes: ['id', 'classification_name'] }),
    result.category || Categories.findByPk(result.categoryId, { attributes: ['id', 'name'] }),
    result.subcategory || SubCategories.findByPk(result.subcategoryId, { attributes: ['id', 'name'] }),
  ]);

  return {
    ...result,
    classification,
    category,
    subcategory,
    incidentalClassifications,
  };
};

module.exports = withClassificationDetails;