import { round } from "mathjs";

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
  close_damage_taken: number;
  distant_damage_taken: number;
}

export const displayPercentage = (value: number) => {
  return `${round((1.0 - value) * 100, 3)}%`;
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

  const total_unique_damage_taken =
    unique_damage_reductions?.reduce((a, b) => a * (1.0 - b * 0.01), 1.0) ||
    1.0;

  let result = {
    close_damage_taken:
      (1.0 - close_damage_reduction * 0.01) *
      (1.0 - class_damage_reduction * 0.01) *
      (1.0 - overall_damage_reduction * 0.01) *
      total_unique_damage_taken,
    distant_damage_taken:
      (1.0 - distant_damage_reduction * 0.01) *
      (1.0 - class_damage_reduction * 0.01) *
      (1.0 - overall_damage_reduction * 0.01) *
      total_unique_damage_taken,
  };

  if (is_fortified) {
    result.close_damage_taken *=
      0.9 * (1.0 - (fortitied_damage_reduction || 0) * 0.01);
    result.distant_damage_taken *=
      0.9 * (1.0 - (fortitied_damage_reduction || 0) * 0.01);
  }

  return result;
};
