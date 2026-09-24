/**
 * Resolve the Variant submitted by a Product form.
 *
 * Legacy Product forms remain URL-first. Secondary Product forms can opt in
 * to their own Variant state with `data-variant-source="form"`.
 *
 * @param {object} values
 * @param {string | null | undefined} [values.urlVariantId]
 * @param {string | null | undefined} [values.formVariantId]
 * @param {string | null | undefined} [values.selectedVariantId]
 * @param {boolean} [values.preferFormVariant]
 * @returns {string | undefined}
 */
export function resolveProductFormVariantId({
  urlVariantId,
  formVariantId,
  selectedVariantId,
  preferFormVariant = false,
}) {
  if (preferFormVariant) {
    return formVariantId || selectedVariantId || urlVariantId || undefined;
  }

  return urlVariantId || formVariantId || selectedVariantId || undefined;
}
