export interface ReductionFormularParams {
  is_fortified: boolean;
  fortitied_damage_reduction?: number;
  close_damage_reduction: number;
  distant_damage_reduction: number;
  overall_damage_reduction: number;
  class_damage_reduction: number;
  unique_damage_reductions?: number[];
}

export interface DamageReductionResult {
  close_damage_reduction: number;
  distant_damage_reduction: number;
}

export const updated_damage_reduction_category = (
  original_damage_reduction: number,
  extra_damage_reduction: number
) => {
  const result =
    100.0 *
    (1 -
      (1 - original_damage_reduction * 0.01) *
        (1 - 0.01 * extra_damage_reduction));

  return result;
};

export const displayPercentage = (value?: number) => {
  return value ? `${((1 - value) * 100).toFixed(3)}%` : "0%";
};

export const getDamageReduction = (
  params: ReductionFormularParams
): DamageReductionResult => {
  const {
    is_fortified,
    fortitied_damage_reduction,
    close_damage_reduction,
    distant_damage_reduction,
    overall_damage_reduction,
    class_damage_reduction,
    unique_damage_reductions,
  } = params;

  console.log(params);

  const total_unique_damage_reduction =
    unique_damage_reductions?.reduce((a, b) => a * (1 - b * 0.01), 1) || 1;
  let result = {
    close_damage_reduction:
      1 *
      (1 - close_damage_reduction * 0.01) *
      (1 - class_damage_reduction * 0.01) *
      (1 - overall_damage_reduction * 0.01) *
      total_unique_damage_reduction,
    distant_damage_reduction:
      1 *
      (1 - distant_damage_reduction * 0.01) *
      (1 - class_damage_reduction * 0.01) *
      (1 - overall_damage_reduction * 0.01) *
      total_unique_damage_reduction,
  };

  if (is_fortified) {
    result.close_damage_reduction *=
      0.9 * (1 - (fortitied_damage_reduction || 0) * 0.01);
    result.distant_damage_reduction *=
      0.9 * (1 - (fortitied_damage_reduction || 0) * 0.01);
  }

  console.log(result);

  return result;
};
