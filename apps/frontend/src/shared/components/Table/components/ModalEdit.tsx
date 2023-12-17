import { Flex, Stack } from '@mantine/core';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'shared/components/Button';
import { Input } from 'shared/components/Input';
import { TextArea } from 'shared/components/TextArea';
import { IPath } from 'shared/models/IPath';

interface ModalEditProps {
  type: string;
  activeRow: IPath | undefined;
  close: () => void;
  setActiveRow: React.Dispatch<React.SetStateAction<IPath | undefined>>;
  getPaths: Function;
}

export const ModalEdit = ({
  activeRow,
  close,
  setActiveRow,
  type,
  getPaths,
}: ModalEditProps) => {
  const { control, handleSubmit } = useForm();
  const spec = activeRow?.specialities.map((item) => item.name);

  const onSubmit = handleSubmit((formData) => {
    if (type === 'path') {
      const newRow = Object.values(formData);
      setActiveRow({
        ...activeRow!,
        pathSteps: activeRow!.pathSteps.map((item, index: number) => ({
          ...item,
          title: newRow[index].title!,
          points: newRow[index].points!,
        })),
      });
    } else {
      let specialities = [];
      if (typeof formData.specialities === 'object') {
        specialities = formData.specialities.map((item: string) => ({
          name: item,
        }));
        setActiveRow({
          ...activeRow!,
          description: formData.description,
          specialities: specialities,
        });
      } else {
        specialities = formData.specialities.split(',').map((item: string) => ({
          name: item,
        }));
        setActiveRow({
          ...activeRow!,
          description: formData.description,
          specialities: specialities,
        });
      }
    }
  });

  return (
    <Stack gap={32}>
      <h2 style={{ textAlign: 'center' }} className="h2">
        Редактирование
      </h2>
      <Stack align="flex-start" gap={24}>
        {type === 'path' ? (
          <Stack w={'100%'} gap={16}>
            {activeRow?.pathSteps.map((item, index) => (
              <Flex align={'center'} key={item.id} justify={'space-between'}>
                <Controller
                  name={`${index}.title`}
                  control={control}
                  defaultValue={item.title}
                  render={(field) => (
                    <Input label="Заголовок шага" w={360} {...field} />
                  )}
                />
                <Controller
                  name={`${index}.points`}
                  control={control}
                  defaultValue={item.points}
                  render={(field) => (
                    <Input w={150} label="Количество баллов" {...field} />
                  )}
                />
              </Flex>
            ))}
          </Stack>
        ) : (
          <Stack w={'100%'} gap={16}>
            <Controller
              name={`description`}
              control={control}
              defaultValue={activeRow?.description}
              render={(field) => (
                <TextArea label="Описание профессии" {...field} />
              )}
            />
            <Controller
              name={`specialities`}
              control={control}
              defaultValue={spec}
              render={(field) => (
                <TextArea custom label="Специальности" {...field} />
              )}
            />
          </Stack>
        )}
      </Stack>
      <Flex w={'100%'} align={'center'} justify={'space-between'}>
        <Button onClick={() => close()} title="Отменить" outline />
        <Button disabled onClick={onSubmit} title="Сохранить изменения" />
      </Flex>
    </Stack>
  );
};
