"use client";
import {
  DamageReductionResult,
  ReductionFormularParams,
  displayPercentage,
  getDamageReduction,
  updated_damage_reduction_category,
} from "@/helpers/reduction_formular";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Space, Statistic, Switch, InputNumber } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";

export default function Home() {
  const [form] = useForm<ReductionFormularParams>();
  const [fortified, setFortified] = useState(false);
  const [extraReduction, setExtraReduction] = useState(0);
  const [damageReduction, setDamageReduction] =
    useState<DamageReductionResult>();
  const [reductionComparisons, setReductionComparisons] = useState<{
    fortitied_damage_reduction: DamageReductionResult;
    close_damage_reduction: DamageReductionResult;
    distant_damage_reduction: DamageReductionResult;
    overall_damage_reduction: DamageReductionResult;
    class_damage_reduction: DamageReductionResult;
    unique_damage_reductions?: DamageReductionResult[];
  }>();
  const [maxCloseReduction, setMaxCloseReduction] = useState(0);
  const [maxDistantReduction, setMaxDistantReduction] = useState(0);

  // useEffect(() => {
  //   form.setFieldsValue({
  //     close_damage_reduction: 0,
  //     distant_damage_reduction: 0,
  //     overall_damage_reduction: 0,
  //     class_damage_reduction: 0,
  //   });
  // }, []);

  useEffect(() => {
    form.setFieldsValue({
      close_damage_reduction: 67.3,
      distant_damage_reduction: 6,
      overall_damage_reduction: 19.2,
      class_damage_reduction: 16,
      fortitied_damage_reduction: 29.5,
      is_fortified: true,
      unique_damage_reductions: [40, 19.9],
    });
  }, []);

  const updateComparison = (
    values: ReductionFormularParams,
    extraReduction: number
  ) => {
    const results = {
      fortitied_damage_reduction: getDamageReduction({
        ...values,
        fortitied_damage_reduction: updated_damage_reduction_category(
          values.fortitied_damage_reduction || 0,
          extraReduction
        ),
      }),
      close_damage_reduction: getDamageReduction({
        ...values,
        close_damage_reduction: updated_damage_reduction_category(
          values.close_damage_reduction,
          extraReduction
        ),
      }),
      distant_damage_reduction: getDamageReduction({
        ...values,
        distant_damage_reduction: updated_damage_reduction_category(
          values.distant_damage_reduction,
          extraReduction
        ),
      }),
      overall_damage_reduction: getDamageReduction({
        ...values,
        overall_damage_reduction: updated_damage_reduction_category(
          values.overall_damage_reduction,
          extraReduction
        ),
      }),
      class_damage_reduction: getDamageReduction({
        ...values,
        class_damage_reduction: updated_damage_reduction_category(
          values.class_damage_reduction,
          extraReduction
        ),
      }),
      unique_damage_reductions: values.unique_damage_reductions?.map((v, i) => {
        let newArray = [...values.unique_damage_reductions!];
        newArray[i] = updated_damage_reduction_category(v, extraReduction);
        return getDamageReduction({
          ...values,
          unique_damage_reductions: newArray,
        });
      }),
    };

    setReductionComparisons(results);

    setMaxCloseReduction(
      Math.min(
        results.fortitied_damage_reduction.close_damage_reduction,
        results.close_damage_reduction.close_damage_reduction,
        results.overall_damage_reduction.close_damage_reduction,
        results.class_damage_reduction.close_damage_reduction,
        ...(results.unique_damage_reductions?.map(
          (u) => u.close_damage_reduction
        ) || [])
      )
    );

    setMaxDistantReduction(
      Math.min(
        results.fortitied_damage_reduction.distant_damage_reduction,
        results.distant_damage_reduction.distant_damage_reduction,
        results.overall_damage_reduction.distant_damage_reduction,
        results.class_damage_reduction.distant_damage_reduction,
        ...(results.unique_damage_reductions?.map(
          (u) => u.distant_damage_reduction
        ) || [])
      )
    );
  };

  console.log(reductionComparisons);

  const getStatisticStyle = (a?: number, b?: number, isClosed?: boolean) => {
    if (a === b) {
      return {};
    }

    const comparison = (a || 0) - (b || 0) < 0;

    return {
      valueStyle: {
        color: comparison ? "#cf1322" : "#3f8600",
      },
      prefix:
        ((isClosed && maxCloseReduction === a) ||
          (!isClosed && maxDistantReduction === a)) &&
        "★",
    };
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-1">
        <div className="bg-gray-300 p-5 m-5 rounded">
          <Form
            layout="horizontal"
            onValuesChange={(_, values) => {
              setFortified(values.is_fortified);
              setDamageReduction(getDamageReduction(values));
              updateComparison(values, extraReduction);
            }}
            form={form}
          >
            <Form.Item
              label="Fortified"
              name="is_fortified"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, curValues) =>
                prevValues.is_fortified !== curValues.is_fortified
              }
            >
              {() => (
                <>
                  {form.getFieldValue("is_fortified") && (
                    <Form.Item
                      label="Fortified damage reduction"
                      name="fortitied_damage_reduction"
                    >
                      <InputNumber addonAfter="%" min={0} max={100} />
                    </Form.Item>
                  )}
                </>
              )}
            </Form.Item>

            <Form.Item
              label="Close damage reduction"
              name="close_damage_reduction"
            >
              <InputNumber addonAfter="%" min={0} max={100} />
            </Form.Item>
            <Form.Item
              label="Distant damage reduction"
              name="distant_damage_reduction"
            >
              <InputNumber addonAfter="%" min={0} max={100} />
            </Form.Item>
            <Form.Item
              label="Overall damage reduction"
              name="overall_damage_reduction"
            >
              <InputNumber addonAfter="%" min={0} max={100} />
            </Form.Item>
            <Form.Item
              label="Class damage reduction"
              name="class_damage_reduction"
            >
              <InputNumber addonAfter="%" min={0} max={100} />
            </Form.Item>

            <Form.List name="unique_damage_reductions">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space key={field.key} align="baseline">
                      <Form.Item
                        {...field}
                        label="Unique damage reduction"
                        name={[field.name]}
                        rules={[
                          { required: true, message: "Missing percentage" },
                        ]}
                      >
                        <InputNumber addonAfter="%" min={0} max={100} />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Unique Damage Reduction
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        </div>

        <div className="bg-gray-300 p-5 m-5 rounded">
          <Statistic
            title="Damage reduction from close enemies"
            value={displayPercentage(damageReduction?.close_damage_reduction)}
          />
          <Statistic
            title="Damage reduction from distant enemies"
            value={displayPercentage(damageReduction?.distant_damage_reduction)}
          />
        </div>

        <div className="bg-gray-300 p-5 m-5 rounded">
          <div className="text-black mb-2">
            Extra damage reduction about to be applied
          </div>

          <InputNumber
            addonAfter="%"
            min={0}
            max={100}
            value={extraReduction}
            onChange={(v) => {
              setExtraReduction(v!);
              updateComparison(form.getFieldsValue(), v!);
            }}
          />
        </div>

        <div className="bg-gray-300 p-5 m-5 rounded">
          {fortified && (
            <div>
              <div className="text-black mb-2">
                Extra Damage Reduction applied to Fortified Damage Reduction
              </div>
              <Statistic
                title="Damage reduction from close enemies"
                value={displayPercentage(
                  reductionComparisons?.fortitied_damage_reduction
                    .close_damage_reduction
                )}
                {...getStatisticStyle(
                  reductionComparisons?.fortitied_damage_reduction
                    .close_damage_reduction,
                  damageReduction?.close_damage_reduction,
                  true
                )}
              />
              <Statistic
                title="Damage reduction from distant enemies"
                value={displayPercentage(
                  reductionComparisons?.fortitied_damage_reduction
                    .distant_damage_reduction
                )}
                {...getStatisticStyle(
                  reductionComparisons?.fortitied_damage_reduction
                    .distant_damage_reduction,
                  damageReduction?.distant_damage_reduction,
                  false
                )}
              />
            </div>
          )}

          <div>
            <div className="text-black mb-2">
              Extra Damage Reduction applied to Close Damage Reduction
            </div>
            <Statistic
              title="Damage reduction from close enemies"
              value={displayPercentage(
                reductionComparisons?.close_damage_reduction
                  .close_damage_reduction
              )}
              {...getStatisticStyle(
                reductionComparisons?.close_damage_reduction
                  .close_damage_reduction,
                damageReduction?.close_damage_reduction,
                true
              )}
            />
            <Statistic
              title="Damage reduction from distant enemies"
              value={displayPercentage(
                reductionComparisons?.close_damage_reduction
                  .distant_damage_reduction
              )}
              {...getStatisticStyle(
                reductionComparisons?.close_damage_reduction
                  .distant_damage_reduction,
                damageReduction?.distant_damage_reduction,
                false
              )}
            />
          </div>

          <div>
            <div className="text-black mb-2">
              Extra Damage Reduction applied to Distant Damage Reduction
            </div>
            <Statistic
              title="Damage reduction from close enemies"
              value={displayPercentage(
                reductionComparisons?.distant_damage_reduction
                  .close_damage_reduction
              )}
              {...getStatisticStyle(
                reductionComparisons?.distant_damage_reduction
                  .close_damage_reduction,
                damageReduction?.close_damage_reduction,
                true
              )}
            />
            <Statistic
              title="Damage reduction from distant enemies"
              value={displayPercentage(
                reductionComparisons?.distant_damage_reduction
                  .distant_damage_reduction
              )}
              {...getStatisticStyle(
                reductionComparisons?.distant_damage_reduction
                  .distant_damage_reduction,
                damageReduction?.distant_damage_reduction,
                false
              )}
            />
          </div>

          <div>
            <div className="text-black mb-2">
              Extra Damage Reduction applied to Overall Damage Reduction
            </div>
            <Statistic
              title="Damage reduction from close enemies"
              value={displayPercentage(
                reductionComparisons?.overall_damage_reduction
                  .close_damage_reduction
              )}
              {...getStatisticStyle(
                reductionComparisons?.overall_damage_reduction
                  .close_damage_reduction,
                damageReduction?.close_damage_reduction,
                true
              )}
            />
            <Statistic
              title="Damage reduction from distant enemies"
              value={displayPercentage(
                reductionComparisons?.overall_damage_reduction
                  .distant_damage_reduction
              )}
              {...getStatisticStyle(
                reductionComparisons?.overall_damage_reduction
                  .distant_damage_reduction,
                damageReduction?.distant_damage_reduction,
                false
              )}
            />
          </div>

          <div>
            <div className="text-black mb-2">
              Extra Damage Reduction applied to Class Damage Reduction
            </div>
            <Statistic
              title="Damage reduction from close enemies"
              value={displayPercentage(
                reductionComparisons?.class_damage_reduction
                  .close_damage_reduction
              )}
              {...getStatisticStyle(
                reductionComparisons?.class_damage_reduction
                  .close_damage_reduction,
                damageReduction?.close_damage_reduction,
                true
              )}
            />
            <Statistic
              title="Damage reduction from distant enemies"
              value={displayPercentage(
                reductionComparisons?.class_damage_reduction
                  .distant_damage_reduction
              )}
              {...getStatisticStyle(
                reductionComparisons?.class_damage_reduction
                  .distant_damage_reduction,
                damageReduction?.distant_damage_reduction,
                false
              )}
            />
          </div>

          {reductionComparisons?.unique_damage_reductions?.map((unique, i) => (
            <div key={i}>
              <div className="text-black mb-2">
                Extra Damage Reduction applied to Unique Damage Reduction
              </div>
              <Statistic
                title="Damage reduction from close enemies"
                value={displayPercentage(unique?.close_damage_reduction)}
                {...getStatisticStyle(
                  unique.close_damage_reduction,
                  damageReduction?.close_damage_reduction,
                  true
                )}
              />
              <Statistic
                title="Damage reduction from distant enemies"
                value={displayPercentage(unique?.distant_damage_reduction)}
                {...getStatisticStyle(
                  unique.distant_damage_reduction,
                  damageReduction?.distant_damage_reduction,
                  false
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
