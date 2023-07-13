import {
  DamageReductionResult,
  ReductionFormularParams,
  displayPercentage,
  getDamageReduction,
} from "@/helpers/reduction_formular";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Space, Statistic, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";

export const DRCalculator = () => {
  const [form] = useForm<ReductionFormularParams>();

  const [damageReduction, setDamageReduction] = useState<DamageReductionResult>(
    {
      close_damage_taken: 1,
      distant_damage_taken: 1,
    }
  );

  useEffect(() => {
    form.setFieldsValue({
      close_damage_reduction: 0,
      distant_damage_reduction: 0,
      overall_damage_reduction: 0,
      class_damage_reduction: 0,
      fortitied_damage_reduction: 0,
    });
  }, []);

  return (
    <div>
      <div
        className="p-5 m-5 rounded"
        style={{ backgroundImage: "url(/background.png)" }}
      >
        <Form
          layout="horizontal"
          onValuesChange={(_, values) => {
            console.log(values);
            setDamageReduction(getDamageReduction(values));
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

      <div
        className="p-5 m-5 rounded"
        style={{ backgroundImage: "url(/background.png)" }}
      >
        <Statistic
          title="Damage reduction from close enemies"
          value={displayPercentage(damageReduction?.close_damage_taken)}
        />
        <Statistic
          title="Damage reduction from distant enemies"
          value={displayPercentage(damageReduction?.distant_damage_taken)}
        />
      </div>
    </div>
  );
};
